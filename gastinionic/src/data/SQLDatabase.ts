import { InterfaceDatabase, Table } from "./InterfaceDatabase";
import { CategoryDataModel } from "./models/CategoryDataModel";
import { RecordDataModel } from "./models/RecordDataModel";
import { ValidityDataModel } from "./models/ValidityDataModel";
import { DatabaseSQLInterface } from "./SQL/DatabaseSQLInterface";
import { RepositoryInterface } from "./SQL/repositories/RepositoryInterface";
import { TB_CATEGORIA_Repository } from "./SQL/repositories/TB_CATEGORIA_Repository";
import { TB_REGISTRO_Repository } from "./SQL/repositories/TB_REGISTRO_Repository";
import { TB_VALIDITY_Repository } from "./SQL/repositories/TB_VALIDITY_Repository";
import { TB_CATEGORIA } from "./SQL/tables/TB_CATEGORIA";
import { TB_REGISTRO } from "./SQL/tables/TB_REGISTRO";
import { TB_VALIDITY } from "./SQL/tables/TB_VALIDITY";


function NumberToISOString(timestamp: number): string {
  try {
    return new Date(timestamp).toISOString();
  }
  catch {
    console.error(`Não foi posivel converter o timestamp ${timestamp}`)
    return ""
  }
}

function IsoStringToNumber(iso: string): number {
  return new Date(iso).getTime();
}


const NumberToColorString = (colorNumber: number): string => {
  const hex = colorNumber.toString(16).padStart(6, '0');
  return `#${hex.slice(-6)}`;
}

const StringToColorNumber = (colorString: string): number => {
  let hex = colorString.replace('#', '');
  if (hex.length === 6) {
    hex = 'FF' + hex;
  }
  return parseInt(hex, 16);
}

class CommonTable implements Table<any, any> {
  sqlRepo!: RepositoryInterface<any>;
  toData(model: any): any {
    throw new Error("Method not implemented.");
  }
  toModel(data: any): any {
    throw new Error("Method not implemented.");
  }

  async add(model: any): Promise<any> {
    const data = await this.sqlRepo.insert(this.toData(model))
    if (!data)
      throw new Error("Erro ao inserir dados.");
    return this.toModel(data)
  }
  async get(id: number): Promise<any> {
    const data = await this.sqlRepo.getById(id)
    if (!data)
      throw new Error("Erro ao obter dados.");
    return this.toModel(data)
  }
  async delete(id: number): Promise<void> {
    const result = await this.sqlRepo.deleteById(id)
    if (!result)
      throw new Error("Erro ao deletar dados.");
  }
  async toArray(): Promise<any[]> {
    const results = await this.sqlRepo.selectAll()
    return results.map(this.toModel)
  }
  async update(id: number, model: any): Promise<any> {
    const dataUpdate = this.toData(model)
    const result = await this.sqlRepo.updateItem(id, dataUpdate)
    if (!result)
      throw new Error("Erro ao atualizar dados.");
    return this.toModel(result)
  }
  filter(object: Record<string, any>): Promise<any[]> {
    throw new Error("Method not implemented.");
  }
  async paginate(page: number, perPage: number, filters?: Record<string, any>): Promise<{ items: any[]; count: number; }> {
    let filter: undefined | "value_gt" | "value_lt"

    if (filters) {
      const keys = Object.keys(filters)
      if (keys.includes("value__lt")) {
        filter = "value_lt"
      }
      else {
        filter = "value_gt"
      }
    }

    const results = await this.sqlRepo.selectPaginated(perPage, page, filter)
    const count = await this.sqlRepo.count()
    return {
      items: results.map(this.toModel),
      count: count,
    }
  }
  range?: ((init: string, end: string) => Promise<any>) | undefined;
}

class CategoryDataModelTable extends CommonTable implements Table<CategoryDataModel, TB_CATEGORIA> {
  constructor(db: DatabaseSQLInterface) {
    super()
    this.sqlRepo = new TB_CATEGORIA_Repository(db)
  }

  toData(model: CategoryDataModel): TB_CATEGORIA {
    const data: TB_CATEGORIA = {
      ID: model.id,
      NAME: model.title,
      DESCRIPTION: model.description,
      COLOR: StringToColorNumber(model.color),
      CREATE_AT: 0,
      TOTAL: 0
    }
    return data
  }
  toModel(data: TB_CATEGORIA): CategoryDataModel {
    const model: CategoryDataModel = {
      id: data.ID,
      title: data.NAME,
      description: data.DESCRIPTION,
      color: NumberToColorString(data.COLOR),
    }
    return model
  }
}

class RecordDataModelTable extends CommonTable implements Table<RecordDataModel, TB_REGISTRO> {
  constructor(db: DatabaseSQLInterface) {
    super()
    this.sqlRepo = new TB_REGISTRO_Repository(db)
  }
  toData(model: RecordDataModel): TB_REGISTRO {
    const data: TB_REGISTRO = {
      ID: model.id,
      VALUE: model.value,
      DESCRIPTION: model.description,
      CATEGORIA_FK: model.categoryId,
      CREATE_AT: IsoStringToNumber(model.createdAt),
      UPDATE_AT: 0,
      IS_DEPESA: 0,
      START_DATE: 0,
      END_DATE: 0,
      IS_RECURRENT: 0,
      IS_EVER_DAYS: 0,
      SALE_DATE: model.date ? IsoStringToNumber(model.date) : 0,
      UNIQUE_ID: model.uniqueId ? model.uniqueId : 0,
      VALIDITY_ID: model.validityId
    }
    return data
  }
  toModel(data: TB_REGISTRO): RecordDataModel {
    const model: RecordDataModel = {
      id: data.ID,
      value: data.VALUE,
      description: data.DESCRIPTION,
      categoryId: data.CATEGORIA_FK,
      createdAt: NumberToISOString(data.CREATE_AT),
      date: NumberToISOString(data.SALE_DATE),
      validityId: Number(data.VALIDITY_ID)
    }
    return model
  }
}

class ValidityDataModelTable extends CommonTable implements Table<ValidityDataModel, TB_VALIDITY> {
  constructor(db: DatabaseSQLInterface) {
    super()
    this.sqlRepo = new TB_VALIDITY_Repository(db)
  }
  toData(model: ValidityDataModel): TB_VALIDITY {
    const data: TB_VALIDITY = {
      ID: model.id,
      IS_EVER_DAYS: Number(model.isEveryDays),
      IS_EVER_MONTH: Number(model.isEveryMonths),
      START_DATE: model.initValidity ? IsoStringToNumber(model.initValidity) : 0,
      END_DATE: model.endValidity ? IsoStringToNumber(model.endValidity) : 0,
      REGISTRO_ID: 0,
    }
    return data
  }
  toModel(data: TB_VALIDITY): ValidityDataModel {
    const model: ValidityDataModel = {
      id: data.ID,
      isEveryDays: Boolean(data.IS_EVER_DAYS),
      isEveryMonths: Boolean(data.IS_EVER_MONTH),
      initValidity: NumberToISOString(data.START_DATE),
      endValidity: NumberToISOString(data.END_DATE),
    }
    return model
  }
}

export class SQLDatabase implements InterfaceDatabase {
  categories: Table
  records: Table
  validities: Table

  constructor(db: DatabaseSQLInterface) {
    this.categories = new CategoryDataModelTable(db)
    this.records = new RecordDataModelTable(db)
    this.validities = new ValidityDataModelTable(db)

  }
}

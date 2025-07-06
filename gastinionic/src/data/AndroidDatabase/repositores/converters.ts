import { CategoryModel } from "@/data/dbmodels/CategoryModel";
import { Categoria, Registro, Validity } from "../models";
import { RecordModel } from "@/data/dbmodels/RecordModel";
import { ValidityModel } from "@/data/dbmodels/ValidityModel";

export const NumberToColorString = (colorNumber: number): string => {
  const hex = colorNumber.toString(16).padStart(6, '0');
  return `#${hex.slice(-6)}`;
}

export const StringToColorNumber = (colorString: string): number => {
  let hex = colorString.replace('#', '');
  if (hex.length === 6) {
    hex = 'FF' + hex;
  }
  return parseInt(hex, 16);
}

export function numberToISOString(timestamp: number): string {
  try {
    return new Date(timestamp).toISOString();
  }
  catch {
    console.error(`Não foi posivel converter o timestamp ${timestamp}`)
    return ""
  }
}

export function isoStringToNumber(iso: string): number {
  return new Date(iso).getTime();
}

export const CategoriaToCategoryModel = (data: Categoria): CategoryModel => {
  return {
    id: data.ID,
    title: data.NAME,
    description: data.DESCRIPTION,
    color: (data.COLOR ? NumberToColorString(data.COLOR) : undefined)!
  }
}

export const CategoryModelToCategoria = (data: CategoryModel): Categoria => {
  return {
    ID: data.id!,
    NAME: data.title,
    DESCRIPTION: data.description,
    COLOR: StringToColorNumber(data.color),
    CREATE_AT: 0,
    TOTAL: 0
  }
}

export const RegistroToRecordModel = (data: Registro): RecordModel => {
  let value = data.VALUE
  if (data.IS_DEPESA && data.VALUE > 0) {
    value = -Math.abs(value)
  }
  return {
    id: data.ID,
    value,
    title: data.DESCRIPTION,
    description: data.DESCRIPTION,
    categoryId: data.CATEGORIA_FK,
    validityId: data.VALIDITY_ID,
    createdAt: numberToISOString(data.CREATE_AT),
    date: numberToISOString(data.SALE_DATE),
    uniqueId: data.UNIQUE_ID,
  }
}


export const RecordModelToRegistro = (data: RecordModel): Registro => {
  if (typeof data.categoryId != "number")
    throw new Error()
  return {
    ID: data.id!,
    VALUE: data.value,
    DESCRIPTION: data.description,
    CATEGORIA_FK: data.categoryId,
    CREATE_AT: isoStringToNumber(data.createdAt),
    UPDATE_AT: 0,
    IS_DEPESA: false,
    IS_RECURRENT: false,
    IS_EVER_DAYS: false,
    START_DATE: 0,
    END_DATE: 0,
    SALE_DATE: (data.date ? isoStringToNumber(data.date) : undefined)!,
    VALIDITY_ID: data.validityId as number,
    UNIQUE_ID: data.uniqueId!
  }
}

export const ValidityToValidityModel = (data: Validity): ValidityModel => {
  return {
    id: data.ID,
    isEveryDays: data.IS_EVER_DAYS,
    initValidity: numberToISOString(data.START_DATE),
    endValidity: numberToISOString(data.END_DATE),
  }
}


export const ValidityModelToValidity = (data: ValidityModel): Validity => {
  return {
    ID: data.id,
    IS_EVER_DAYS: data.isEveryDays,
    START_DATE: (data.initValidity ? isoStringToNumber(data.initValidity) : undefined)!,
    END_DATE: (data.initValidity ? isoStringToNumber(data.initValidity) : undefined)!,
  }
}

import { TB_REGISTRO } from "../tables/TB_REGISTRO";
import { RepositoryInterface } from "./RepositoryInterface";
export class TB_CATEGORIA_Repository implements RepositoryInterface<TB_REGISTRO> {
    getById(ID: number): TB_REGISTRO | undefined {
        throw new Error("Method not implemented.");
    }
    selectAll(): TB_REGISTRO[] {
        throw new Error("Method not implemented.");
    }
    deleteById(ID: number): boolean {
        throw new Error("Method not implemented.");
    }
    updateItem(ID: number, data: TB_REGISTRO): TB_REGISTRO | undefined {
        throw new Error("Method not implemented.");
    }
}

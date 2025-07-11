import { TB_CATEGORIA } from "../tables/TB_CATEGORIA";
import { RepositoryInterface } from "./RepositoryInterface";

export class TB_CATEGORIA_Repository implements RepositoryInterface<TB_CATEGORIA> {
    getById(ID: number): TB_CATEGORIA | undefined {
        throw new Error("Method not implemented.");
    }
    selectAll(): TB_CATEGORIA[] {
        throw new Error("Method not implemented.");
    }
    deleteById(ID: number): boolean {
        throw new Error("Method not implemented.");
    }
    updateItem(ID: number, data: TB_CATEGORIA): TB_CATEGORIA | undefined {
        throw new Error("Method not implemented.");
    }
}

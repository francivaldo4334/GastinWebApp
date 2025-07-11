import { TB_VALIDITY } from "../tables/TB_VALIDITY";
import { RepositoryInterface } from "./RepositoryInterface";

export class TB_CATEGORIA_Repository implements RepositoryInterface<TB_VALIDITY> {
    getById(ID: number): TB_VALIDITY | undefined {
        throw new Error("Method not implemented.");
    }
    selectAll(): TB_VALIDITY[] {
        throw new Error("Method not implemented.");
    }
    deleteById(ID: number): boolean {
        throw new Error("Method not implemented.");
    }
    updateItem(ID: number, data: TB_VALIDITY): TB_VALIDITY | undefined {
        throw new Error("Method not implemented.");
    }
}

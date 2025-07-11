export interface TB_REGISTRO {
  ID: number;
  VALUE: number;
  DESCRIPTION: string;
  CATEGORIA_FK: number;
  CREATE_AT: number;
  UPDATE_AT: number;
  IS_DEPESA: number;
  START_DATE: number;
  END_DATE: number;
  IS_RECURRENT: number;
  IS_EVER_DAYS: number;
  SALE_DATE: number;
  UNIQUE_ID: number;
  VALIDITY_ID?: number;
}

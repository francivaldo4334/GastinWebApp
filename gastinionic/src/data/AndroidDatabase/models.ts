//TB_CATEGORIA
export interface Categoria {
  //ID pk
  ID: number;
  //NAME
  NAME: string;
  //DESCRIPTION
  DESCRIPTION: string
  //COLOR
  COLOR: number
  //CREATE_AT
  CREATE_AT: number
  //TOTAL
  TOTAL: number
}
//TB_REGISTRO
export interface Registro {
  //ID pk
  ID: number
  //VALUE
  VALUE: number;
  //DESCRIPTION
  DESCRIPTION: string;
  //CATEGORIA_FK
  CATEGORIA_FK: number
  //CREATE_AT
  CREATE_AT: number;
  //UPDATE_AT
  UPDATE_AT: number;
  //IS_DEPESA
  IS_DEPESA: boolean;
  //IS_RECURRENT
  IS_RECURRENT: boolean
  //IS_EVER_DAYS
  IS_EVER_DAYS: boolean
  //START_DATE
  START_DATE: number
  //END_DATE
  END_DATE: number
  //SALE_DATE
  SALE_DATE: number;

  VALIDITY_ID: number

  UNIQUE_ID: number;
}

//TB_VALIDITY
export interface Validity {
  ID: number
  IS_EVER_DAYS: boolean
  IS_EVER_MONTH: boolean
  START_DATE: number
  END_DATE: number
}

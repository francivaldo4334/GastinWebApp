export interface DatabaseSQLInterface {
  init(): void
  query(query: string): any
}

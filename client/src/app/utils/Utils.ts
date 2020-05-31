export class Utils {
  static getQueryParamsFromObject(obj: any): string {
    let query = '?';

    for (const [key, val] of Object.entries(obj)) {
      query += `${key}=${val}&`;
    }
    return query.substring(0, query.length - 1);
  }
}

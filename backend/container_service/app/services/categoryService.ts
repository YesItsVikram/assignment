import { Request } from '@custom_modules/utils';
import { CategoryServiceConstants } from '../Constants';
import {
  ContainerCategory,
  GetCategoryRequest,
  GetCategryResponse,
} from '@custom_modules/models';

export class CategoryService {
  async getCategory(id: string): Promise<ContainerCategory | null> {
    const reqData: GetCategoryRequest = {
      id,
      collection: 'CONTAINERS',
    };

    const resp = await Request.HttpRequest<
      GetCategryResponse<ContainerCategory>
    >(
      this.getUrl(CategoryServiceConstants.ROUTES.GET_CATEGORY) +
        Request.getQueryParamsFromObject(reqData),
      { method: 'GET' }
    );

    if (resp?.status?.resp_code === 200) return resp.category;

    return null;
  }

  private getUrl(path = ''): string {
    const baseRoute = CategoryServiceConstants.BASE_ROUTE;
    return (
      (baseRoute.charAt(baseRoute.length - 1) === '/'
        ? baseRoute.substr(0, baseRoute.length - 1)
        : baseRoute) + path
    );
  }
}

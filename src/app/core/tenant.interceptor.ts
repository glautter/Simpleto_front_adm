import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TenantService } from './tenant.service';

export const tenantInterceptor: HttpInterceptorFn = (req, next) => {
  const tenantService = inject(TenantService);
  const ownerId = tenantService.getOwner();

  if (!ownerId) return next(req);

  const cloned = req.clone({
    setHeaders: { 'X-Owner-Id': ownerId }
  });
  return next(cloned);
};

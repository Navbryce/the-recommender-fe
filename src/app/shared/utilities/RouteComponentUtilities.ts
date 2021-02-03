import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

export function getOrFetchObjectFromBrowserRoute<T>(
  router: Router,
  activatedRouter: ActivatedRoute,
  idParamField: string,
  routerField: string,
  objectIdField: string,
  fetchFunction: (id: string) => Observable<T>
): [string, Observable<T>] {
  const id = activatedRouter.snapshot.paramMap.get(idParamField);
  const object: T | undefined = router.getCurrentNavigation().extras.state?.[
    routerField
  ];

  if (object) {
    if (id !== object[objectIdField]) {
      throw new Error(
        `The id on the route ${id} conflicts with the object provided ${object[objectIdField]}`
      );
    }
    return [id, of(object)];
  }

  return [id, fetchFunction(id)];
}

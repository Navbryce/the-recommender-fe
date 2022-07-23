import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ROUTES } from '../../../routes.const';
import { ElectionMetadata } from 'src/app/data/models/ElectionMetadata.class';

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

export function getDinnerPartyVoteURL(electionId: string) {
  return `/${ROUTES.election.path}/${electionId}/${ROUTES.election.routes.vote.path}`;
}

export function getDinnerPartyResultsCommands(
  electionId: string,
  election?: ElectionMetadata
) {
  return [
    `/${ROUTES.election.path}/${electionId}/${ROUTES.election.routes.results.path}`,
    {
      state: {
        election,
      },
    },
  ];
}

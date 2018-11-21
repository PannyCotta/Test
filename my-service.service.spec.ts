import { TestBed, inject, async } from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { MyServiceService } from './my-service.service';

describe('MyServiceService', () => {

  const mockResponse = {
    "data": [
      {
        "full_name": "Carlos Mesa",
        "id": "12",
        "profile_picture": "",
        "username": "Holanda"
      }
    ],
    "meta": {
      "code": 0
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MyServiceService]
    });
  });

  describe('obtener datos', () => {
    it('debe obtener resultados',
    inject([HttpTestingController, MyServiceService], (httpMock: HttpTestingController, myServiceTested: MyServiceService) => {
      const swapiUrl = 'https://api.instagram.com/v1/users/search';
      myServiceTested.getCharacter()
      .subscribe(
        (res) => {
          expect(res).toEqual(mockResponse);
        }
      );
      const req = httpMock.expectOne(swapiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    })
  );
  });
});

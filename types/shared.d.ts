export interface CustomMatchers<R> extends Record<string, any> {
  /**
   * Use .toBeSuccessful when checking if Axios response status code is between 200 and 299 included
   */
  toBeSuccessful(): R;

  /**
   * Use .toHave2xxStatus when checking if Axios response status code is between 200 and 299 included
   */
  toHave2xxStatus(): R;

  /**
   * Use .toHave3xxStatus when checking if Axios response status code is between 300 and 399 included
   */
  toHave3xxStatus(): R;

  /**
   * Use .toHave4xxStatus when checking if Axios response status code is between 400 and 499 included
   */
  toHave4xxStatus(): R;

  /**
   * Use .toHave5xxStatus when checking if Axios response status code is between 500 and 599 included
   */
  toHave5xxStatus(): R;

  /**
   * Use .toHaveStatus when checking if the response has specific status code.
   * @param {unknown} status the status code to match with
   **/
  toHaveStatus(status: unknown): R;

  /**
   * Use .toHaveSwitchingProtocolsStatus when checking if HTTP response status code is 101
   */
  toHaveSwitchingProtocolsStatus(): R;

  /**
   * Use .toHaveOkStatus when checking if HTTP response status code is 200
   */
  toHaveOkStatus(): R;

  /**
   * Use .toHaveCreatedStatus when checking if HTTP response status code is 201
   */
  toHaveCreatedStatus(): R;

  /**
   * Use .toHaveAcceptedStatus when checking if HTTP response status code is 202
   */
  toHaveAcceptedStatus(): R;

  /**
   * Use .toHaveNonAuthoritativeInformationStatus when checking if HTTP response status code is 203
   */
  toHaveNonAuthoritativeInformationStatus(): R;

  /**
   * Use .toHaveNoContentStatus when checking if HTTP response status code is 204
   */
  toHaveNoContentStatus(): R;

  /**
   * Use .toHaveResetContentStatus when checking if HTTP response status code is 205
   */
  toHaveResetContentStatus(): R;

  /**
   * Use .toHavePartialContentStatus when checking if HTTP response status code is 206
   */
  toHavePartialContentStatus(): R;

  /**
   * Use .toHaveMultiStatusStatus when checking if HTTP response status code is 207
   */
  toHaveMultiStatusStatus(): R;

  /**
   * Use .toHaveMultipleChoicesStatus when checking if HTTP response status code is 300
   */
  toHaveMultipleChoicesStatus(): R;

  /**
   * Use .toHaveMovedPermanentlyStatus when checking if HTTP response status code is 301
   */
  toHaveMovedPermanentlyStatus(): R;

  /**
   * Use .toHaveMovedTemporarilyStatus when checking if HTTP response status code is 302
   */
  toHaveMovedTemporarilyStatus(): R;

  /**
   * Use .toHaveSeeOtherStatus when checking if HTTP response status code is 303
   */
  toHaveSeeOtherStatus(): R;

  /**
   * Use .toHaveNotModifiedStatus when checking if HTTP response status code is 304
   */
  toHaveNotModifiedStatus(): R;

  /**
   * Use .toHaveUseProxyStatus when checking if HTTP response status code is 305
   */
  toHaveUseProxyStatus(): R;

  /**
   * Use .toHaveTemporaryRedirectStatus when checking if HTTP response status code is 307
   */
  toHaveTemporaryRedirectStatus(): R;

  /**
   * Use .toHavePermanentRedirectStatus when checking if HTTP response status code is 308
   */
  toHavePermanentRedirectStatus(): R;

  /**
   * Use .toHaveBadRequestStatus when checking if HTTP response status code is 400
   */
  toHaveBadRequestStatus(): R;

  /**
   * Use .toHaveUnauthorizedStatus when checking if HTTP response status code is 401
   */
  toHaveUnauthorizedStatus(): R;

  /**
   * Use .toHavePaymentRequiredStatus when checking if HTTP response status code is 402
   */
  toHavePaymentRequiredStatus(): R;

  /**
   * Use .toHaveForbiddenStatus when checking if HTTP response status code is 403
   */
  toHaveForbiddenStatus(): R;

  /**
   * Use .toHaveNotFoundStatus when checking if HTTP response status code is 404
   */
  toHaveNotFoundStatus(): R;

  /**
   * Use .toHaveMethodNotAllowedStatus when checking if HTTP response status code is 405
   */
  toHaveMethodNotAllowedStatus(): R;

  /**
   * Use .toHaveNotAcceptableStatus when checking if HTTP response status code is 406
   */
  toHaveNotAcceptableStatus(): R;

  /**
   * Use .toHaveProxyAuthenticationRequiredStatus when checking if HTTP response status code is 407
   */
  toHaveProxyAuthenticationRequiredStatus(): R;

  /**
   * Use .toHaveRequestTimeoutStatus when checking if HTTP response status code is 408
   */
  toHaveRequestTimeoutStatus(): R;

  /**
   * Use .toHaveConflictStatus when checking if HTTP response status code is 409
   */
  toHaveConflictStatus(): R;

  /**
   * Use .toHaveGoneStatus when checking if HTTP response status code is 410
   */
  toHaveGoneStatus(): R;

  /**
   * Use .toHaveLengthRequiredStatus when checking if HTTP response status code is 411
   */
  toHaveLengthRequiredStatus(): R;

  /**
   * Use .toHavePreconditionFailedStatus when checking if HTTP response status code is 412
   */
  toHavePreconditionFailedStatus(): R;

  /**
   * Use .toHaveRequestTooLongStatus when checking if HTTP response status code is 413
   */
  toHaveRequestTooLongStatus(): R;

  /**
   * Use .toHaveRequestUriTooLongStatus when checking if HTTP response status code is 414
   */
  toHaveRequestUriTooLongStatus(): R;

  /**
   * Use .toHaveUnsupportedMediaTypeStatus when checking if HTTP response status code is 415
   */
  toHaveUnsupportedMediaTypeStatus(): R;

  /**
   * Use .toHaveRequestedRangeNotSatisfiableStatus when checking if HTTP response status code is 416
   */
  toHaveRequestedRangeNotSatisfiableStatus(): R;

  /**
   * Use .toHaveExpectationFailedStatus when checking if HTTP response status code is 417
   */
  toHaveExpectationFailedStatus(): R;

  /**
   * Use .toHaveImATeapotStatus when checking if HTTP response status code is 418
   */
  toHaveImATeapotStatus(): R;

  /**
   * Use .toHaveInsufficientSpaceOnResourceStatus when checking if HTTP response status code is 419
   */
  toHaveInsufficientSpaceOnResourceStatus(): R;

  /**
   * Use .toHaveMethodFailureStatus when checking if HTTP response status code is 420
   */
  toHaveMethodFailureStatus(): R;

  /**
   * Use .toHaveMisdirectedRequestStatus when checking if HTTP response status code is 421
   */
  toHaveMisdirectedRequestStatus(): R;

  /**
   * Use .toHaveUnprocessableEntityStatus when checking if HTTP response status code is 422
   */
  toHaveUnprocessableEntityStatus(): R;

  /**
   * Use .toHaveLockedStatus when checking if HTTP response status code is 423
   */
  toHaveLockedStatus(): R;

  /**
   * Use .toHaveFailedDependencyStatus when checking if HTTP response status code is 424
   */
  toHaveFailedDependencyStatus(): R;

  /**
   * Use .toHaveUpgradeRequiredStatus when checking if HTTP response status code is 426
   */
  toHaveUpgradeRequiredStatus(): R;

  /**
   * Use .toHavePreconditionRequiredStatus when checking if HTTP response status code is 428
   */
  toHavePreconditionRequiredStatus(): R;

  /**
   * Use .toHaveTooManyRequestsStatus when checking if HTTP response status code is 429
   */
  toHaveTooManyRequestsStatus(): R;

  /**
   * Use .toHaveRequestHeaderFieldsTooLargeStatus when checking if HTTP response status code is 431
   */
  toHaveRequestHeaderFieldsTooLargeStatus(): R;

  /**
   * Use .toHaveUnavailableForLegalReasonsStatus when checking if HTTP response status code is 451
   */
  toHaveUnavailableForLegalReasonsStatus(): R;

  /**
   * Use .toHaveInternalServerErrorStatus when checking if HTTP response status code is 500
   */
  toHaveInternalServerErrorStatus(): R;

  /**
   * Use .toHaveNotImplementedStatus when checking if HTTP response status code is 501
   */
  toHaveNotImplementedStatus(): R;

  /**
   * Use .toHaveBadGatewayStatus when checking if HTTP response status code is 502
   */
  toHaveBadGatewayStatus(): R;

  /**
   * Use .toHaveServiceUnavailableStatus when checking if HTTP response status code is 503
   */
  toHaveServiceUnavailableStatus(): R;

  /**
   * Use .toHaveGatewayTimeoutStatus when checking if HTTP response status code is 504
   */
  toHaveGatewayTimeoutStatus(): R;

  /**
   * Use .toHaveHttpVersionNotSupportedStatus when checking if HTTP response status code is 505
   */
  toHaveHttpVersionNotSupportedStatus(): R;

  /**
   * Use .toHaveInsufficientStorageStatus when checking if HTTP response status code is 507
   */
  toHaveInsufficientStorageStatus(): R;

  /**
   * Use .toHaveNetworkAuthenticationRequiredStatus when checking if HTTP response status code is 511
   */
  toHaveNetworkAuthenticationRequiredStatus(): R;
}

// noinspection JSUnusedGlobalSymbols
export interface SharedMatchers<R> {
  /**
   * Use .toBeSuccessful when checking if HTTP response status code is between 200 and 299 included
   */
  toBeSuccessful(): R;

  /**
   Use .toHave2xxStatus when checking if HTTP response status code is between 200 and 299 included
   */
  toHave2xxStatus(): R;

  /**
   * Use .toHave3xxStatus when checking if HTTP response status code is between 300 and 399 included
   */
  toHave3xxStatus(): R;

  /**
   * Use .toHave4xxStatus when checking if HTTP response status code is between 400 and 499 included
   */
  toHave4xxStatus(): R;

  /**
   * Use .toHave5xxStatus when checking if HTTP response status code is between 500 and 599 included
   */
  toHave5xxStatus(): R;

  /**
   * Use .toHaveStatus when checking if the response has specific status code.
   * @param {unknown} status the status code to match with
   **/
  toHaveStatus(status: unknown): R;

  /**
   * Use .toHaveSwitchingProtocolsStatus when checking if HTTP response status code is 101
   */
  toHaveSwitchingProtocolsStatus(): R;

  /**
   * Use .toHaveOkStatus when checking if HTTP response status code is 200
   */
  toHaveOkStatus(): R;

  /**
   * Use .toHaveCreatedStatus when checking if HTTP response status code is 201
   */
  toHaveCreatedStatus(): R;

  /**
   * Use .toHaveAcceptedStatus when checking if HTTP response status code is 202
   */
  toHaveAcceptedStatus(): R;

  /**
   * Use .toHaveNonAuthoritativeInformationStatus when checking if HTTP response status code is 203
   */
  toHaveNonAuthoritativeInformationStatus(): R;

  /**
   * Use .toHaveNoContentStatus when checking if HTTP response status code is 204
   */
  toHaveNoContentStatus(): R;

  /**
   * Use .toHaveResetContentStatus when checking if HTTP response status code is 205
   */
  toHaveResetContentStatus(): R;

  /**
   * Use .toHavePartialContentStatus when checking if HTTP response status code is 206
   */
  toHavePartialContentStatus(): R;

  /**
   * Use .toHaveMultiStatusStatus when checking if HTTP response status code is 207
   */
  toHaveMultiStatusStatus(): R;

  /**
   * Use .toHaveMultipleChoicesStatus when checking if HTTP response status code is 300
   */
  toHaveMultipleChoicesStatus(): R;

  /**
   * Use .toHaveMovedPermanentlyStatus when checking if HTTP response status code is 301
   */
  toHaveMovedPermanentlyStatus(): R;

  /**
   * Use .toHaveMovedTemporarilyStatus when checking if HTTP response status code is 302
   */
  toHaveMovedTemporarilyStatus(): R;

  /**
   * Use .toHaveSeeOtherStatus when checking if HTTP response status code is 303
   */
  toHaveSeeOtherStatus(): R;

  /**
   * Use .toHaveNotModifiedStatus when checking if HTTP response status code is 304
   */
  toHaveNotModifiedStatus(): R;

  /**
   * Use .toHaveUseProxyStatus when checking if HTTP response status code is 305
   */
  toHaveUseProxyStatus(): R;

  /**
   * Use .toHaveTemporaryRedirectStatus when checking if HTTP response status code is 307
   */
  toHaveTemporaryRedirectStatus(): R;

  /**
   * Use .toHavePermanentRedirectStatus when checking if HTTP response status code is 308
   */
  toHavePermanentRedirectStatus(): R;

  /**
   * Use .toHaveBadRequestStatus when checking if HTTP response status code is 400
   */
  toHaveBadRequestStatus(): R;

  /**
   * Use .toHaveUnauthorizedStatus when checking if HTTP response status code is 401
   */
  toHaveUnauthorizedStatus(): R;

  /**
   * Use .toHavePaymentRequiredStatus when checking if HTTP response status code is 402
   */
  toHavePaymentRequiredStatus(): R;

  /**
   * Use .toHaveForbiddenStatus when checking if HTTP response status code is 403
   */
  toHaveForbiddenStatus(): R;

  /**
   * Use .toHaveNotFoundStatus when checking if HTTP response status code is 404
   */
  toHaveNotFoundStatus(): R;

  /**
   * Use .toHaveMethodNotAllowedStatus when checking if HTTP response status code is 405
   */
  toHaveMethodNotAllowedStatus(): R;

  /**
   * Use .toHaveNotAcceptableStatus when checking if HTTP response status code is 406
   */
  toHaveNotAcceptableStatus(): R;

  /**
   * Use .toHaveProxyAuthenticationRequiredStatus when checking if HTTP response status code is 407
   */
  toHaveProxyAuthenticationRequiredStatus(): R;

  /**
   * Use .toHaveRequestTimeoutStatus when checking if HTTP response status code is 408
   */
  toHaveRequestTimeoutStatus(): R;

  /**
   * Use .toHaveConflictStatus when checking if HTTP response status code is 409
   */
  toHaveConflictStatus(): R;

  /**
   * Use .toHaveGoneStatus when checking if HTTP response status code is 410
   */
  toHaveGoneStatus(): R;

  /**
   * Use .toHaveLengthRequiredStatus when checking if HTTP response status code is 411
   */
  toHaveLengthRequiredStatus(): R;

  /**
   * Use .toHavePreconditionFailedStatus when checking if HTTP response status code is 412
   */
  toHavePreconditionFailedStatus(): R;

  /**
   * Use .toHaveRequestTooLongStatus when checking if HTTP response status code is 413
   */
  toHaveRequestTooLongStatus(): R;

  /**
   * Use .toHaveRequestUriTooLongStatus when checking if HTTP response status code is 414
   */
  toHaveRequestUriTooLongStatus(): R;

  /**
   * Use .toHaveUnsupportedMediaTypeStatus when checking if HTTP response status code is 415
   */
  toHaveUnsupportedMediaTypeStatus(): R;

  /**
   * Use .toHaveRequestedRangeNotSatisfiableStatus when checking if HTTP response status code is 416
   */
  toHaveRequestedRangeNotSatisfiableStatus(): R;

  /**
   * Use .toHaveExpectationFailedStatus when checking if HTTP response status code is 417
   */
  toHaveExpectationFailedStatus(): R;

  /**
   * Use .toHaveImATeapotStatus when checking if HTTP response status code is 418
   */
  toHaveImATeapotStatus(): R;

  /**
   * Use .toHaveInsufficientSpaceOnResourceStatus when checking if HTTP response status code is 419
   */
  toHaveInsufficientSpaceOnResourceStatus(): R;

  /**
   * Use .toHaveMethodFailureStatus when checking if HTTP response status code is 420
   */
  toHaveMethodFailureStatus(): R;

  /**
   * Use .toHaveMisdirectedRequestStatus when checking if HTTP response status code is 421
   */
  toHaveMisdirectedRequestStatus(): R;

  /**
   * Use .toHaveUnprocessableEntityStatus when checking if HTTP response status code is 422
   */
  toHaveUnprocessableEntityStatus(): R;

  /**
   * Use .toHaveLockedStatus when checking if HTTP response status code is 423
   */
  toHaveLockedStatus(): R;

  /**
   * Use .toHaveFailedDependencyStatus when checking if HTTP response status code is 424
   */
  toHaveFailedDependencyStatus(): R;

  /**
   * Use .toHaveUpgradeRequiredStatus when checking if HTTP response status code is 426
   */
  toHaveUpgradeRequiredStatus(): R;

  /**
   * Use .toHavePreconditionRequiredStatus when checking if HTTP response status code is 428
   */
  toHavePreconditionRequiredStatus(): R;

  /**
   * Use .toHaveTooManyRequestsStatus when checking if HTTP response status code is 429
   */
  toHaveTooManyRequestsStatus(): R;

  /**
   * Use .toHaveRequestHeaderFieldsTooLargeStatus when checking if HTTP response status code is 431
   */
  toHaveRequestHeaderFieldsTooLargeStatus(): R;

  /**
   * Use .toHaveUnavailableForLegalReasonsStatus when checking if HTTP response status code is 451
   */
  toHaveUnavailableForLegalReasonsStatus(): R;

  /**
   * Use .toHaveInternalServerErrorStatus when checking if HTTP response status code is 500
   */
  toHaveInternalServerErrorStatus(): R;

  /**
   * Use .toHaveNotImplementedStatus when checking if HTTP response status code is 501
   */
  toHaveNotImplementedStatus(): R;

  /**
   * Use .toHaveBadGatewayStatus when checking if HTTP response status code is 502
   */
  toHaveBadGatewayStatus(): R;

  /**
   * Use .toHaveServiceUnavailableStatus when checking if HTTP response status code is 503
   */
  toHaveServiceUnavailableStatus(): R;

  /**
   * Use .toHaveGatewayTimeoutStatus when checking if HTTP response status code is 504
   */
  toHaveGatewayTimeoutStatus(): R;

  /**
   * Use .toHaveHttpVersionNotSupportedStatus when checking if HTTP response status code is 505
   */
  toHaveHttpVersionNotSupportedStatus(): R;

  /**
   * Use .toHaveInsufficientStorageStatus when checking if HTTP response status code is 507
   */
  toHaveInsufficientStorageStatus(): R;

  /**
   * Use .toHaveNetworkAuthenticationRequiredStatus when checking if HTTP response status code is 511
   */
  toHaveNetworkAuthenticationRequiredStatus(): R;
}

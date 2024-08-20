import axios from 'axios';

async function run() {
  const res = await axios.get('http://example.com');

  expect(res).toBeTruthy();

  expect(res).toBeSuccessful();
  expect(res).not.toBeSuccessful();

  expect(res).toHave2xxStatus();
  expect(res).not.toHave2xxStatus();

  expect(res).toHave3xxStatus();
  expect(res).not.toHave3xxStatus();

  expect(res).toHave4xxStatus();
  expect(res).not.toHave4xxStatus();

  expect(res).toHave5xxStatus();
  expect(res).not.toHave5xxStatus();

  expect(res).toHaveStatus(100);
  expect(res).not.toHaveStatus(100);

  expect(res).toHaveSwitchingProtocolsStatus();
  expect(res).not.toHaveSwitchingProtocolsStatus();

  expect(res).toHaveOkStatus();
  expect(res).not.toHaveOkStatus();

  expect(res).toHaveCreatedStatus();
  expect(res).not.toHaveCreatedStatus();

  expect(res).toHaveAcceptedStatus();
  expect(res).not.toHaveAcceptedStatus();

  expect(res).toHaveNonAuthoritativeInformationStatus();
  expect(res).not.toHaveNonAuthoritativeInformationStatus();

  expect(res).toHaveNoContentStatus();
  expect(res).not.toHaveNoContentStatus();

  expect(res).toHaveResetContentStatus();
  expect(res).not.toHaveResetContentStatus();

  expect(res).toHavePartialContentStatus();
  expect(res).not.toHavePartialContentStatus();

  expect(res).toHaveMultiStatusStatus();
  expect(res).not.toHaveMultiStatusStatus();

  expect(res).toHaveMultipleChoicesStatus();
  expect(res).not.toHaveMultipleChoicesStatus();

  expect(res).toHaveMovedPermanentlyStatus();
  expect(res).not.toHaveMovedPermanentlyStatus();

  expect(res).toHaveMovedTemporarilyStatus();
  expect(res).not.toHaveMovedTemporarilyStatus();

  expect(res).toHaveSeeOtherStatus();
  expect(res).not.toHaveSeeOtherStatus();

  expect(res).toHaveNotModifiedStatus();
  expect(res).not.toHaveNotModifiedStatus();

  expect(res).toHaveUseProxyStatus();
  expect(res).not.toHaveUseProxyStatus();

  expect(res).toHaveTemporaryRedirectStatus();
  expect(res).not.toHaveTemporaryRedirectStatus();

  expect(res).toHavePermanentRedirectStatus();
  expect(res).not.toHavePermanentRedirectStatus();

  expect(res).toHaveBadRequestStatus();
  expect(res).not.toHaveBadRequestStatus();

  expect(res).toHaveUnauthorizedStatus();
  expect(res).not.toHaveUnauthorizedStatus();

  expect(res).toHavePaymentRequiredStatus();
  expect(res).not.toHavePaymentRequiredStatus();

  expect(res).toHaveForbiddenStatus();
  expect(res).not.toHaveForbiddenStatus();

  expect(res).toHaveNotFoundStatus();
  expect(res).not.toHaveNotFoundStatus();

  expect(res).toHaveMethodNotAllowedStatus();
  expect(res).not.toHaveMethodNotAllowedStatus();

  expect(res).toHaveNotAcceptableStatus();
  expect(res).not.toHaveNotAcceptableStatus();

  expect(res).toHaveProxyAuthenticationRequiredStatus();
  expect(res).not.toHaveProxyAuthenticationRequiredStatus();

  expect(res).toHaveRequestTimeoutStatus();
  expect(res).not.toHaveRequestTimeoutStatus();

  expect(res).toHaveConflictStatus();
  expect(res).not.toHaveConflictStatus();

  expect(res).toHaveGoneStatus();
  expect(res).not.toHaveGoneStatus();

  expect(res).toHaveLengthRequiredStatus();
  expect(res).not.toHaveLengthRequiredStatus();

  expect(res).toHavePreconditionFailedStatus();
  expect(res).not.toHavePreconditionFailedStatus();

  expect(res).toHaveRequestTooLongStatus();
  expect(res).not.toHaveRequestTooLongStatus();

  expect(res).toHaveRequestUriTooLongStatus();
  expect(res).not.toHaveRequestUriTooLongStatus();

  expect(res).toHaveUnsupportedMediaTypeStatus();
  expect(res).not.toHaveUnsupportedMediaTypeStatus();

  expect(res).toHaveRequestedRangeNotSatisfiableStatus();
  expect(res).not.toHaveRequestedRangeNotSatisfiableStatus();

  expect(res).toHaveExpectationFailedStatus();
  expect(res).not.toHaveExpectationFailedStatus();

  expect(res).toHaveImATeapotStatus();
  expect(res).not.toHaveImATeapotStatus();

  expect(res).toHaveInsufficientSpaceOnResourceStatus();
  expect(res).not.toHaveInsufficientSpaceOnResourceStatus();

  expect(res).toHaveMethodFailureStatus();
  expect(res).not.toHaveMethodFailureStatus();

  expect(res).toHaveMisdirectedRequestStatus();
  expect(res).not.toHaveMisdirectedRequestStatus();

  expect(res).toHaveUnprocessableEntityStatus();
  expect(res).not.toHaveUnprocessableEntityStatus();

  expect(res).toHaveLockedStatus();
  expect(res).not.toHaveLockedStatus();

  expect(res).toHaveFailedDependencyStatus();
  expect(res).not.toHaveFailedDependencyStatus();

  expect(res).toHaveUpgradeRequiredStatus();
  expect(res).not.toHaveUpgradeRequiredStatus();

  expect(res).toHavePreconditionRequiredStatus();
  expect(res).not.toHavePreconditionRequiredStatus();

  expect(res).toHaveTooManyRequestsStatus();
  expect(res).not.toHaveTooManyRequestsStatus();

  expect(res).toHaveRequestHeaderFieldsTooLargeStatus();
  expect(res).not.toHaveRequestHeaderFieldsTooLargeStatus();

  expect(res).toHaveUnavailableForLegalReasonsStatus();
  expect(res).not.toHaveUnavailableForLegalReasonsStatus();

  expect(res).toHaveInternalServerErrorStatus();
  expect(res).not.toHaveInternalServerErrorStatus();

  expect(res).toHaveNotImplementedStatus();
  expect(res).not.toHaveNotImplementedStatus();

  expect(res).toHaveBadGatewayStatus();
  expect(res).not.toHaveBadGatewayStatus();

  expect(res).toHaveServiceUnavailableStatus();
  expect(res).not.toHaveServiceUnavailableStatus();

  expect(res).toHaveGatewayTimeoutStatus();
  expect(res).not.toHaveGatewayTimeoutStatus();

  expect(res).toHaveHttpVersionNotSupportedStatus();
  expect(res).not.toHaveHttpVersionNotSupportedStatus();

  expect(res).toHaveInsufficientStorageStatus();
  expect(res).not.toHaveInsufficientStorageStatus();

  expect(res).toHaveNetworkAuthenticationRequiredStatus();
  expect(res).not.toHaveNetworkAuthenticationRequiredStatus();
}

run();

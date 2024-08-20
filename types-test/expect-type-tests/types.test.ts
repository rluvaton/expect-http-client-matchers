import axios from 'axios';
import expect from 'expect';

async function run() {
  const res = await axios.get('http://example.com');

  expect(res).toBeTruthy();

  expect(res).toBeSuccessful();
  expect(res).not.toBeSuccessful();
  expect(res).toEqual(expect.toBeSuccessful());
  expect(res).toEqual(expect.not.toBeSuccessful());

  expect(res).toHave2xxStatus();
  expect(res).not.toHave2xxStatus();
  expect(res).toEqual(expect.toHave2xxStatus());
  expect(res).toEqual(expect.not.toHave2xxStatus());

  expect(res).toHave3xxStatus();
  expect(res).not.toHave3xxStatus();
  expect(res).toEqual(expect.toHave3xxStatus());
  expect(res).toEqual(expect.not.toHave3xxStatus());

  expect(res).toHave4xxStatus();
  expect(res).not.toHave4xxStatus();
  expect(res).toEqual(expect.toHave4xxStatus());
  expect(res).toEqual(expect.not.toHave4xxStatus());

  expect(res).toHave5xxStatus();
  expect(res).not.toHave5xxStatus();
  expect(res).toEqual(expect.toHave5xxStatus());
  expect(res).toEqual(expect.not.toHave5xxStatus());

  expect(res).toHaveStatus(100);
  expect(res).not.toHaveStatus(100);
  expect(res).toEqual(expect.toHaveStatus(100));
  expect(res).toEqual(expect.not.toHaveStatus(100));

  expect(res).toHaveSwitchingProtocolsStatus();
  expect(res).not.toHaveSwitchingProtocolsStatus();
  expect(res).toEqual(expect.toHaveSwitchingProtocolsStatus());
  expect(res).toEqual(expect.not.toHaveSwitchingProtocolsStatus());

  expect(res).toHaveOkStatus();
  expect(res).not.toHaveOkStatus();
  expect(res).toEqual(expect.toHaveOkStatus());
  expect(res).toEqual(expect.not.toHaveOkStatus());

  expect(res).toHaveCreatedStatus();
  expect(res).not.toHaveCreatedStatus();
  expect(res).toEqual(expect.toHaveCreatedStatus());
  expect(res).toEqual(expect.not.toHaveCreatedStatus());

  expect(res).toHaveAcceptedStatus();
  expect(res).not.toHaveAcceptedStatus();
  expect(res).toEqual(expect.toHaveAcceptedStatus());
  expect(res).toEqual(expect.not.toHaveAcceptedStatus());

  expect(res).toHaveNonAuthoritativeInformationStatus();
  expect(res).not.toHaveNonAuthoritativeInformationStatus();
  expect(res).toEqual(expect.toHaveNonAuthoritativeInformationStatus());
  expect(res).toEqual(expect.not.toHaveNonAuthoritativeInformationStatus());

  expect(res).toHaveNoContentStatus();
  expect(res).not.toHaveNoContentStatus();
  expect(res).toEqual(expect.toHaveNoContentStatus());
  expect(res).toEqual(expect.not.toHaveNoContentStatus());

  expect(res).toHaveResetContentStatus();
  expect(res).not.toHaveResetContentStatus();
  expect(res).toEqual(expect.toHaveResetContentStatus());
  expect(res).toEqual(expect.not.toHaveResetContentStatus());

  expect(res).toHavePartialContentStatus();
  expect(res).not.toHavePartialContentStatus();
  expect(res).toEqual(expect.toHavePartialContentStatus());
  expect(res).toEqual(expect.not.toHavePartialContentStatus());

  expect(res).toHaveMultiStatusStatus();
  expect(res).not.toHaveMultiStatusStatus();
  expect(res).toEqual(expect.toHaveMultiStatusStatus());
  expect(res).toEqual(expect.not.toHaveMultiStatusStatus());

  expect(res).toHaveMultipleChoicesStatus();
  expect(res).not.toHaveMultipleChoicesStatus();
  expect(res).toEqual(expect.toHaveMultipleChoicesStatus());
  expect(res).toEqual(expect.not.toHaveMultipleChoicesStatus());

  expect(res).toHaveMovedPermanentlyStatus();
  expect(res).not.toHaveMovedPermanentlyStatus();
  expect(res).toEqual(expect.toHaveMovedPermanentlyStatus());
  expect(res).toEqual(expect.not.toHaveMovedPermanentlyStatus());

  expect(res).toHaveMovedTemporarilyStatus();
  expect(res).not.toHaveMovedTemporarilyStatus();
  expect(res).toEqual(expect.toHaveMovedTemporarilyStatus());
  expect(res).toEqual(expect.not.toHaveMovedTemporarilyStatus());

  expect(res).toHaveSeeOtherStatus();
  expect(res).not.toHaveSeeOtherStatus();
  expect(res).toEqual(expect.toHaveSeeOtherStatus());
  expect(res).toEqual(expect.not.toHaveSeeOtherStatus());

  expect(res).toHaveNotModifiedStatus();
  expect(res).not.toHaveNotModifiedStatus();
  expect(res).toEqual(expect.toHaveNotModifiedStatus());
  expect(res).toEqual(expect.not.toHaveNotModifiedStatus());

  expect(res).toHaveUseProxyStatus();
  expect(res).not.toHaveUseProxyStatus();
  expect(res).toEqual(expect.toHaveUseProxyStatus());
  expect(res).toEqual(expect.not.toHaveUseProxyStatus());

  expect(res).toHaveTemporaryRedirectStatus();
  expect(res).not.toHaveTemporaryRedirectStatus();
  expect(res).toEqual(expect.toHaveTemporaryRedirectStatus());
  expect(res).toEqual(expect.not.toHaveTemporaryRedirectStatus());

  expect(res).toHavePermanentRedirectStatus();
  expect(res).not.toHavePermanentRedirectStatus();
  expect(res).toEqual(expect.toHavePermanentRedirectStatus());
  expect(res).toEqual(expect.not.toHavePermanentRedirectStatus());

  expect(res).toHaveBadRequestStatus();
  expect(res).not.toHaveBadRequestStatus();
  expect(res).toEqual(expect.toHaveBadRequestStatus());
  expect(res).toEqual(expect.not.toHaveBadRequestStatus());

  expect(res).toHaveUnauthorizedStatus();
  expect(res).not.toHaveUnauthorizedStatus();
  expect(res).toEqual(expect.toHaveUnauthorizedStatus());
  expect(res).toEqual(expect.not.toHaveUnauthorizedStatus());

  expect(res).toHavePaymentRequiredStatus();
  expect(res).not.toHavePaymentRequiredStatus();
  expect(res).toEqual(expect.toHavePaymentRequiredStatus());
  expect(res).toEqual(expect.not.toHavePaymentRequiredStatus());

  expect(res).toHaveForbiddenStatus();
  expect(res).not.toHaveForbiddenStatus();
  expect(res).toEqual(expect.toHaveForbiddenStatus());
  expect(res).toEqual(expect.not.toHaveForbiddenStatus());

  expect(res).toHaveNotFoundStatus();
  expect(res).not.toHaveNotFoundStatus();
  expect(res).toEqual(expect.toHaveNotFoundStatus());
  expect(res).toEqual(expect.not.toHaveNotFoundStatus());

  expect(res).toHaveMethodNotAllowedStatus();
  expect(res).not.toHaveMethodNotAllowedStatus();
  expect(res).toEqual(expect.toHaveMethodNotAllowedStatus());
  expect(res).toEqual(expect.not.toHaveMethodNotAllowedStatus());

  expect(res).toHaveNotAcceptableStatus();
  expect(res).not.toHaveNotAcceptableStatus();
  expect(res).toEqual(expect.toHaveNotAcceptableStatus());
  expect(res).toEqual(expect.not.toHaveNotAcceptableStatus());

  expect(res).toHaveProxyAuthenticationRequiredStatus();
  expect(res).not.toHaveProxyAuthenticationRequiredStatus();
  expect(res).toEqual(expect.toHaveProxyAuthenticationRequiredStatus());
  expect(res).toEqual(expect.not.toHaveProxyAuthenticationRequiredStatus());

  expect(res).toHaveRequestTimeoutStatus();
  expect(res).not.toHaveRequestTimeoutStatus();
  expect(res).toEqual(expect.toHaveRequestTimeoutStatus());
  expect(res).toEqual(expect.not.toHaveRequestTimeoutStatus());

  expect(res).toHaveConflictStatus();
  expect(res).not.toHaveConflictStatus();
  expect(res).toEqual(expect.toHaveConflictStatus());
  expect(res).toEqual(expect.not.toHaveConflictStatus());

  expect(res).toHaveGoneStatus();
  expect(res).not.toHaveGoneStatus();
  expect(res).toEqual(expect.toHaveGoneStatus());
  expect(res).toEqual(expect.not.toHaveGoneStatus());

  expect(res).toHaveLengthRequiredStatus();
  expect(res).not.toHaveLengthRequiredStatus();
  expect(res).toEqual(expect.toHaveLengthRequiredStatus());
  expect(res).toEqual(expect.not.toHaveLengthRequiredStatus());

  expect(res).toHavePreconditionFailedStatus();
  expect(res).not.toHavePreconditionFailedStatus();
  expect(res).toEqual(expect.toHavePreconditionFailedStatus());
  expect(res).toEqual(expect.not.toHavePreconditionFailedStatus());

  expect(res).toHaveRequestTooLongStatus();
  expect(res).not.toHaveRequestTooLongStatus();
  expect(res).toEqual(expect.toHaveRequestTooLongStatus());
  expect(res).toEqual(expect.not.toHaveRequestTooLongStatus());

  expect(res).toHaveRequestUriTooLongStatus();
  expect(res).not.toHaveRequestUriTooLongStatus();
  expect(res).toEqual(expect.toHaveRequestUriTooLongStatus());
  expect(res).toEqual(expect.not.toHaveRequestUriTooLongStatus());

  expect(res).toHaveUnsupportedMediaTypeStatus();
  expect(res).not.toHaveUnsupportedMediaTypeStatus();
  expect(res).toEqual(expect.toHaveUnsupportedMediaTypeStatus());
  expect(res).toEqual(expect.not.toHaveUnsupportedMediaTypeStatus());

  expect(res).toHaveRequestedRangeNotSatisfiableStatus();
  expect(res).not.toHaveRequestedRangeNotSatisfiableStatus();
  expect(res).toEqual(expect.toHaveRequestedRangeNotSatisfiableStatus());
  expect(res).toEqual(expect.not.toHaveRequestedRangeNotSatisfiableStatus());

  expect(res).toHaveExpectationFailedStatus();
  expect(res).not.toHaveExpectationFailedStatus();
  expect(res).toEqual(expect.toHaveExpectationFailedStatus());
  expect(res).toEqual(expect.not.toHaveExpectationFailedStatus());

  expect(res).toHaveImATeapotStatus();
  expect(res).not.toHaveImATeapotStatus();
  expect(res).toEqual(expect.toHaveImATeapotStatus());
  expect(res).toEqual(expect.not.toHaveImATeapotStatus());

  expect(res).toHaveInsufficientSpaceOnResourceStatus();
  expect(res).not.toHaveInsufficientSpaceOnResourceStatus();
  expect(res).toEqual(expect.toHaveInsufficientSpaceOnResourceStatus());
  expect(res).toEqual(expect.not.toHaveInsufficientSpaceOnResourceStatus());

  expect(res).toHaveMethodFailureStatus();
  expect(res).not.toHaveMethodFailureStatus();
  expect(res).toEqual(expect.toHaveMethodFailureStatus());
  expect(res).toEqual(expect.not.toHaveMethodFailureStatus());

  expect(res).toHaveMisdirectedRequestStatus();
  expect(res).not.toHaveMisdirectedRequestStatus();
  expect(res).toEqual(expect.toHaveMisdirectedRequestStatus());
  expect(res).toEqual(expect.not.toHaveMisdirectedRequestStatus());

  expect(res).toHaveUnprocessableEntityStatus();
  expect(res).not.toHaveUnprocessableEntityStatus();
  expect(res).toEqual(expect.toHaveUnprocessableEntityStatus());
  expect(res).toEqual(expect.not.toHaveUnprocessableEntityStatus());

  expect(res).toHaveLockedStatus();
  expect(res).not.toHaveLockedStatus();
  expect(res).toEqual(expect.toHaveLockedStatus());
  expect(res).toEqual(expect.not.toHaveLockedStatus());

  expect(res).toHaveFailedDependencyStatus();
  expect(res).not.toHaveFailedDependencyStatus();
  expect(res).toEqual(expect.toHaveFailedDependencyStatus());
  expect(res).toEqual(expect.not.toHaveFailedDependencyStatus());

  expect(res).toHaveUpgradeRequiredStatus();
  expect(res).not.toHaveUpgradeRequiredStatus();
  expect(res).toEqual(expect.toHaveUpgradeRequiredStatus());
  expect(res).toEqual(expect.not.toHaveUpgradeRequiredStatus());

  expect(res).toHavePreconditionRequiredStatus();
  expect(res).not.toHavePreconditionRequiredStatus();
  expect(res).toEqual(expect.toHavePreconditionRequiredStatus());
  expect(res).toEqual(expect.not.toHavePreconditionRequiredStatus());

  expect(res).toHaveTooManyRequestsStatus();
  expect(res).not.toHaveTooManyRequestsStatus();
  expect(res).toEqual(expect.toHaveTooManyRequestsStatus());
  expect(res).toEqual(expect.not.toHaveTooManyRequestsStatus());

  expect(res).toHaveRequestHeaderFieldsTooLargeStatus();
  expect(res).not.toHaveRequestHeaderFieldsTooLargeStatus();
  expect(res).toEqual(expect.toHaveRequestHeaderFieldsTooLargeStatus());
  expect(res).toEqual(expect.not.toHaveRequestHeaderFieldsTooLargeStatus());

  expect(res).toHaveUnavailableForLegalReasonsStatus();
  expect(res).not.toHaveUnavailableForLegalReasonsStatus();
  expect(res).toEqual(expect.toHaveUnavailableForLegalReasonsStatus());
  expect(res).toEqual(expect.not.toHaveUnavailableForLegalReasonsStatus());

  expect(res).toHaveInternalServerErrorStatus();
  expect(res).not.toHaveInternalServerErrorStatus();
  expect(res).toEqual(expect.toHaveInternalServerErrorStatus());
  expect(res).toEqual(expect.not.toHaveInternalServerErrorStatus());

  expect(res).toHaveNotImplementedStatus();
  expect(res).not.toHaveNotImplementedStatus();
  expect(res).toEqual(expect.toHaveNotImplementedStatus());
  expect(res).toEqual(expect.not.toHaveNotImplementedStatus());

  expect(res).toHaveBadGatewayStatus();
  expect(res).not.toHaveBadGatewayStatus();
  expect(res).toEqual(expect.toHaveBadGatewayStatus());
  expect(res).toEqual(expect.not.toHaveBadGatewayStatus());

  expect(res).toHaveServiceUnavailableStatus();
  expect(res).not.toHaveServiceUnavailableStatus();
  expect(res).toEqual(expect.toHaveServiceUnavailableStatus());
  expect(res).toEqual(expect.not.toHaveServiceUnavailableStatus());

  expect(res).toHaveGatewayTimeoutStatus();
  expect(res).not.toHaveGatewayTimeoutStatus();
  expect(res).toEqual(expect.toHaveGatewayTimeoutStatus());
  expect(res).toEqual(expect.not.toHaveGatewayTimeoutStatus());

  expect(res).toHaveHttpVersionNotSupportedStatus();
  expect(res).not.toHaveHttpVersionNotSupportedStatus();
  expect(res).toEqual(expect.toHaveHttpVersionNotSupportedStatus());
  expect(res).toEqual(expect.not.toHaveHttpVersionNotSupportedStatus());

  expect(res).toHaveInsufficientStorageStatus();
  expect(res).not.toHaveInsufficientStorageStatus();
  expect(res).toEqual(expect.toHaveInsufficientStorageStatus());
  expect(res).toEqual(expect.not.toHaveInsufficientStorageStatus());

  expect(res).toHaveNetworkAuthenticationRequiredStatus();
  expect(res).not.toHaveNetworkAuthenticationRequiredStatus();
  expect(res).toEqual(expect.toHaveNetworkAuthenticationRequiredStatus());
  expect(res).toEqual(expect.not.toHaveNetworkAuthenticationRequiredStatus());
}

run();

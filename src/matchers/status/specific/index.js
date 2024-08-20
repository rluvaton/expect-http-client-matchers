const { toHaveSwitchingProtocolsStatus } = require('./toHaveSwitchingProtocolsStatus.js');
const { toHaveOkStatus } = require('./toHaveOkStatus.js');
const { toHaveCreatedStatus } = require('./toHaveCreatedStatus.js');
const { toHaveAcceptedStatus } = require('./toHaveAcceptedStatus.js');
const { toHaveNonAuthoritativeInformationStatus } = require('./toHaveNonAuthoritativeInformationStatus.js');
const { toHaveNoContentStatus } = require('./toHaveNoContentStatus.js');
const { toHaveResetContentStatus } = require('./toHaveResetContentStatus.js');
const { toHavePartialContentStatus } = require('./toHavePartialContentStatus.js');
const { toHaveMultiStatusStatus } = require('./toHaveMultiStatusStatus.js');
const { toHaveMultipleChoicesStatus } = require('./toHaveMultipleChoicesStatus.js');
const { toHaveMovedPermanentlyStatus } = require('./toHaveMovedPermanentlyStatus.js');
const { toHaveMovedTemporarilyStatus } = require('./toHaveMovedTemporarilyStatus.js');
const { toHaveSeeOtherStatus } = require('./toHaveSeeOtherStatus.js');
const { toHaveNotModifiedStatus } = require('./toHaveNotModifiedStatus.js');
const { toHaveUseProxyStatus } = require('./toHaveUseProxyStatus.js');
const { toHaveTemporaryRedirectStatus } = require('./toHaveTemporaryRedirectStatus.js');
const { toHavePermanentRedirectStatus } = require('./toHavePermanentRedirectStatus.js');
const { toHaveBadRequestStatus } = require('./toHaveBadRequestStatus.js');
const { toHaveUnauthorizedStatus } = require('./toHaveUnauthorizedStatus.js');
const { toHavePaymentRequiredStatus } = require('./toHavePaymentRequiredStatus.js');
const { toHaveForbiddenStatus } = require('./toHaveForbiddenStatus.js');
const { toHaveNotFoundStatus } = require('./toHaveNotFoundStatus.js');
const { toHaveMethodNotAllowedStatus } = require('./toHaveMethodNotAllowedStatus.js');
const { toHaveNotAcceptableStatus } = require('./toHaveNotAcceptableStatus.js');
const { toHaveProxyAuthenticationRequiredStatus } = require('./toHaveProxyAuthenticationRequiredStatus.js');
const { toHaveRequestTimeoutStatus } = require('./toHaveRequestTimeoutStatus.js');
const { toHaveConflictStatus } = require('./toHaveConflictStatus.js');
const { toHaveGoneStatus } = require('./toHaveGoneStatus.js');
const { toHaveLengthRequiredStatus } = require('./toHaveLengthRequiredStatus.js');
const { toHavePreconditionFailedStatus } = require('./toHavePreconditionFailedStatus.js');
const { toHaveRequestTooLongStatus } = require('./toHaveRequestTooLongStatus.js');
const { toHaveRequestUriTooLongStatus } = require('./toHaveRequestUriTooLongStatus.js');
const { toHaveUnsupportedMediaTypeStatus } = require('./toHaveUnsupportedMediaTypeStatus.js');
const { toHaveRequestedRangeNotSatisfiableStatus } = require('./toHaveRequestedRangeNotSatisfiableStatus.js');
const { toHaveExpectationFailedStatus } = require('./toHaveExpectationFailedStatus.js');
const { toHaveImATeapotStatus } = require('./toHaveImATeapotStatus.js');
const { toHaveInsufficientSpaceOnResourceStatus } = require('./toHaveInsufficientSpaceOnResourceStatus.js');
const { toHaveMethodFailureStatus } = require('./toHaveMethodFailureStatus.js');
const { toHaveMisdirectedRequestStatus } = require('./toHaveMisdirectedRequestStatus.js');
const { toHaveUnprocessableEntityStatus } = require('./toHaveUnprocessableEntityStatus.js');
const { toHaveLockedStatus } = require('./toHaveLockedStatus.js');
const { toHaveFailedDependencyStatus } = require('./toHaveFailedDependencyStatus.js');
const { toHaveUpgradeRequiredStatus } = require('./toHaveUpgradeRequiredStatus.js');
const { toHavePreconditionRequiredStatus } = require('./toHavePreconditionRequiredStatus.js');
const { toHaveTooManyRequestsStatus } = require('./toHaveTooManyRequestsStatus.js');
const { toHaveRequestHeaderFieldsTooLargeStatus } = require('./toHaveRequestHeaderFieldsTooLargeStatus.js');
const { toHaveUnavailableForLegalReasonsStatus } = require('./toHaveUnavailableForLegalReasonsStatus.js');
const { toHaveInternalServerErrorStatus } = require('./toHaveInternalServerErrorStatus.js');
const { toHaveNotImplementedStatus } = require('./toHaveNotImplementedStatus.js');
const { toHaveBadGatewayStatus } = require('./toHaveBadGatewayStatus.js');
const { toHaveServiceUnavailableStatus } = require('./toHaveServiceUnavailableStatus.js');
const { toHaveGatewayTimeoutStatus } = require('./toHaveGatewayTimeoutStatus.js');
const { toHaveHttpVersionNotSupportedStatus } = require('./toHaveHttpVersionNotSupportedStatus.js');
const { toHaveInsufficientStorageStatus } = require('./toHaveInsufficientStorageStatus.js');
const { toHaveNetworkAuthenticationRequiredStatus } = require('./toHaveNetworkAuthenticationRequiredStatus.js');

module.exports = {
  toHaveSwitchingProtocolsStatus,
  toHaveOkStatus,
  toHaveCreatedStatus,
  toHaveAcceptedStatus,
  toHaveNonAuthoritativeInformationStatus,
  toHaveNoContentStatus,
  toHaveResetContentStatus,
  toHavePartialContentStatus,
  toHaveMultiStatusStatus,
  toHaveMultipleChoicesStatus,
  toHaveMovedPermanentlyStatus,
  toHaveMovedTemporarilyStatus,
  toHaveSeeOtherStatus,
  toHaveNotModifiedStatus,
  toHaveUseProxyStatus,
  toHaveTemporaryRedirectStatus,
  toHavePermanentRedirectStatus,
  toHaveBadRequestStatus,
  toHaveUnauthorizedStatus,
  toHavePaymentRequiredStatus,
  toHaveForbiddenStatus,
  toHaveNotFoundStatus,
  toHaveMethodNotAllowedStatus,
  toHaveNotAcceptableStatus,
  toHaveProxyAuthenticationRequiredStatus,
  toHaveRequestTimeoutStatus,
  toHaveConflictStatus,
  toHaveGoneStatus,
  toHaveLengthRequiredStatus,
  toHavePreconditionFailedStatus,
  toHaveRequestTooLongStatus,
  toHaveRequestUriTooLongStatus,
  toHaveUnsupportedMediaTypeStatus,
  toHaveRequestedRangeNotSatisfiableStatus,
  toHaveExpectationFailedStatus,
  toHaveImATeapotStatus,
  toHaveInsufficientSpaceOnResourceStatus,
  toHaveMethodFailureStatus,
  toHaveMisdirectedRequestStatus,
  toHaveUnprocessableEntityStatus,
  toHaveLockedStatus,
  toHaveFailedDependencyStatus,
  toHaveUpgradeRequiredStatus,
  toHavePreconditionRequiredStatus,
  toHaveTooManyRequestsStatus,
  toHaveRequestHeaderFieldsTooLargeStatus,
  toHaveUnavailableForLegalReasonsStatus,
  toHaveInternalServerErrorStatus,
  toHaveNotImplementedStatus,
  toHaveBadGatewayStatus,
  toHaveServiceUnavailableStatus,
  toHaveGatewayTimeoutStatus,
  toHaveHttpVersionNotSupportedStatus,
  toHaveInsufficientStorageStatus,
  toHaveNetworkAuthenticationRequiredStatus,
};

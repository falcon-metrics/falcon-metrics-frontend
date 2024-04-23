import { useCallback } from 'react';
import useAuthentication from 'hooks/useAuthentication';
import { Feature, TelemetryActions } from './telemetry/types';
import { sendTelemetry } from './telemetry/sendTelemetry';


export const useSendTelemetry = () => {
  const { userInfo } = useAuthentication();
  const _sendTelemetry = useCallback(
    (action: TelemetryActions, detail: string, feature?:Feature) =>
      sendTelemetry(userInfo, action, detail, feature),
    [userInfo],
  );
  return _sendTelemetry;
};

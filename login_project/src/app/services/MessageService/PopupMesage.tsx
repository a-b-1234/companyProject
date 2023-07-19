// /**
//  *
//  * Message
//  *
//  */
import { Slide, Snackbar, Alert, SlideProps } from '@mui/material';

export interface MessageOptions {
  message?: string | null | undefined;
  severity?: string,
  autoHide?: boolean;
  autoHideDurationInMilliSeconds?: number | null | undefined;
  autoHideWhenBlur?: boolean | null | undefined;
  onClose?: (event?, reason?) => void;
}
export interface PopupMessageOptions extends MessageOptions {
  isDisplay: boolean;
}

export const PopupMessage = (props: PopupMessageOptions) => {
  const {
    message,
    autoHide = true,
    autoHideDurationInMilliSeconds = 10000,
    autoHideWhenBlur = true,
    isDisplay,
    severity,
  } = props;

  const convertSeverityToAlertColor = (severity?: string) => {
    switch (severity) {
      case 'error':
        return 'error';
      case 'info':
        return 'info';
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      default:
        return 'info';
    }
  }

  const onClose = (event?, reason?) => {
    if (props.onClose && reason != "clickaway") {
      props.onClose(event, reason);
    }
  };

  return message ? (
    <Snackbar
      autoHideDuration={autoHide ? autoHideDurationInMilliSeconds : null}
      disableWindowBlurListener={autoHideWhenBlur!}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isDisplay}
      onClose={onClose}
      TransitionComponent={(params: SlideProps) => <Slide {...params} direction="left" />}
    >
      <Alert severity={convertSeverityToAlertColor(severity)} variant="filled" onClose={onClose}>
        <div dangerouslySetInnerHTML={{ __html: message }}></div>
      </Alert>
    </Snackbar>
  ) : (
    <></>
  );
}


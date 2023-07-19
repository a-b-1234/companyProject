import React from 'react';
import { MessageOptions, PopupMessage } from './PopupMesage';

const MessageServiceContext = React.createContext<
  (options: MessageOptions) => void
>((options: MessageOptions) => {});

export const useMessage = () => React.useContext(MessageServiceContext);

export const MessageServiceProvider = ({ children }) => {
  const [MessageState, setMessageState] = React.useState<MessageOptions | null>(
    null,
  );

  const openMessage = (options: MessageOptions) => {
    //wait 1 millisecond because the message is displayed only after async delay
    const asyncShowMessage = async () => {
      await new Promise(resolve => {
        setTimeout(() => resolve(true), 1);
      });

      setMessageState(options);
    };
    asyncShowMessage();
  };

  const handleClose = (event, reason) => {
    setMessageState(null);
    if (MessageState?.onClose) {
      MessageState.onClose(event, reason);
    }
  };

  return (
    <>
      <MessageServiceContext.Provider value={openMessage} children={children} />

      <PopupMessage
        {...MessageState}
        isDisplay={Boolean(MessageState)}
        onClose={handleClose}
      />
    </>
  );
};

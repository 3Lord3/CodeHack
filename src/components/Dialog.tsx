import { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { dialogAtom } from '../atoms';

export default function Dialog() {
  const [dialog, setDialog] = useAtom(dialogAtom);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (dialog && !element.open) element.showModal();
    if (!dialog && element.open) element.close();
  }, [dialog]);

  const isError = dialog?.type === 'error';

  return (
    <dialog ref={ref} className="dialog" onClose={() => setDialog(null)}>
      <div className="dialog-wrapper">
        <h2
          className="dialog-title"
          style={{ background: isError ? 'rgba(255, 0, 0, 0.15)' : 'rgba(0, 128, 0, 0.15)' }}
        >
          {isError ? '❗️Ошибка' : '⭐️ Совет'}
        </h2>
        <p className="dialog-text">{dialog?.text ?? ''}</p>
        <button className="block dialog-close" onClick={() => setDialog(null)}>
          Закрыть
        </button>
      </div>
    </dialog>
  );
}

import styles from './SkipButton.module.scss';

export interface SkipButtonProps {
  direction: 'next' | 'prev';
  canSkip: boolean;
  onClick: () => void;
}

export function SkipButton({ direction, canSkip, onClick }: SkipButtonProps) {
  return (
    <div className={styles['container']}>
      <button
        className="btn btn-link text-white btn-sm"
        disabled={!canSkip}
        data-cy="button"
        onClick={onClick}
      >
        {direction === 'prev' ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-skip-start-fill"
            viewBox="0 0 16 16"
          >
            <path d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.54-.313 1.232.066 1.232.696v7.384c0 .63-.692 1.01-1.232.697L5 8.753V12a.5.5 0 0 1-1 0V4z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-skip-end-fill"
            viewBox="0 0 16 16"
          >
            <path d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.693 3.3 4 3.678 4 4.308v7.384c0 .63.692 1.01 1.233.697L11.5 8.753V12a.5.5 0 0 0 1 0V4z" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default SkipButton;

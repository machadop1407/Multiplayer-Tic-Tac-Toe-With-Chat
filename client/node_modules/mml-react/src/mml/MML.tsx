import React, { useState, useMemo, useCallback, FC, ComponentType, FormEvent } from 'react';

import { Parse, ConvertorType } from '../parser';
import { Loading as LoadingComponent, LoadingProps } from '../components/Loading';
import { Error as ErrorComponent, ErrorProps } from '../components/Error';
import { Success as SuccessComponent, SuccessProps } from '../components/Success';

export type MMLProps = {
  /** The MML string source to render */
  source: string;
  /** The convert config allows you to overwrite the MML to react conversion */
  converters?: Record<string, ConvertorType>;
  /** The submit callback whenever a form is submitted, submit is expected to return a promise */
  onSubmit?: (data: Record<string, any>) => Promise<any> | any;
  /** Select a theme from built in available themes, it will be added as a className to the container(root) div */
  theme?:
    | 'base-dark'
    | 'messaging-light'
    | 'messaging-dark'
    | 'team-light'
    | 'team-dark'
    | 'commerce-light'
    | 'commerce-dark'
    | 'livestream-light'
    | 'livestream-dark'
    | string;
  /** Custom classname, appended to wrapper classname */
  className?: string;
  /** The Loading component, accepts null to render nothing */
  Loading?: ComponentType<LoadingProps> | null;
  /** The error component, accepts null to render nothing */
  Error?: ComponentType<ErrorProps> | null;
  /** The success message component, accepts null to render nothing */
  Success?: ComponentType<SuccessProps> | null;
};

/**
 * MML root component
 */
export const MML: FC<MMLProps> = ({
  source,
  onSubmit,
  converters,
  theme = '',
  className = '',
  Loading = LoadingComponent,
  Error = ErrorComponent,
  Success = SuccessComponent,
}) => {
  const [error, setError] = useState('');
  const [submitState, setSubmitState] = useState({ loading: false, error: '', success: '' });
  const tree = useMemo(() => {
    try {
      return Parse(source, converters);
    } catch (e) {
      console.warn('mml parsing error: ', source, e);
      setError("This chat message has invalid formatting and can't be shown");
      return null;
    }
  }, [source, converters]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const state: Record<string, any> = {};
      if (tree?.name) state.mml_name = tree.name; // include mml_name in the data
      new FormData(event.currentTarget).forEach((value, key) => {
        state[key] = value;
      });

      if (!onSubmit) return console.warn('Forgot to pass onSubmit prop to <MML/>? payload:', state);

      try {
        setSubmitState({ loading: true, error: '', success: '' });
        await onSubmit(state);
        setSubmitState({ loading: false, error: '', success: 'submitted' });
      } catch (e) {
        setSubmitState({ loading: false, error: 'Failed to send the request. Please try again.', success: '' });
      }
    },
    [onSubmit, tree],
  );

  return (
    <div className={`mml-container ${theme} ${className}`} data-testid="mml-container">
      {error ? (
        <div className="mml-wrap">{Error && <Error error={error} />}</div>
      ) : (
        <form onSubmit={handleSubmit} className="mml-wrap" data-testid="mml-form">
          {tree?.type ? <div className="mml-card">{tree?.reactElements}</div> : tree?.reactElements}
          {submitState.loading && Loading && <Loading loading={submitState.loading} />}
          {submitState.success && Success && <Success success={submitState.success} />}
          {submitState.error && Error && <Error error={submitState.error} />}
        </form>
      )}
    </div>
  );
};

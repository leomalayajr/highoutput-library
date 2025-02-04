import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormErrorMessageProps,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  HelpTextProps,
  ThemingProps,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import React, { FC, ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type WithoutChildren<T> = Omit<T, 'children'>;
export interface FormContainerProps
  extends Partial<UseFormRegisterReturn>,
    ThemingProps {
  id: string;
  label?: string;
  labelColor?: string;
  errorMsg?: string;
  helperMsg?: string;
  disabled?: boolean;
  children?: ReactNode;
  partProps?: Partial<{
    formControl: WithoutChildren<FormControlProps>;
    formLabel: WithoutChildren<FormLabelProps>;
    formErrorMessage: WithoutChildren<FormErrorMessageProps>;
    formHelperText: WithoutChildren<HelpTextProps>;
  }>;
}

const FormContainer: FC<FormContainerProps> = ({
  id,
  label,
  labelColor,
  errorMsg,
  helperMsg,
  children,
  disabled,
  partProps,
  variant,
}) => {
  const styles = useMultiStyleConfig('Form', { variant });

  return (
    <FormControl
      id={id}
      isInvalid={Boolean(errorMsg)}
      isReadOnly={disabled}
      data-testid="formcontainer.formcontrol"
      sx={styles.formControl}
      {...partProps?.formControl}
    >
      {label && (
        <FormLabel
          borderRadius="4px"
          {...(labelColor && { color: labelColor })}
          data-testid="formcontainer.label"
          sx={styles.formLabel}
          {...partProps?.formLabel}
        >
          {label}
        </FormLabel>
      )}
      {children}
      <FormErrorMessage
        sx={styles.formErrorMessage}
        {...partProps?.formErrorMessage}
        data-testid="formcontainer.error"
      >
        {errorMsg}
      </FormErrorMessage>
      {helperMsg && (
        <FormHelperText
          sx={styles.formHelperText}
          {...partProps?.formErrorMessage}
          data-testid="formcontainer.helper"
        >
          {helperMsg}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default FormContainer;

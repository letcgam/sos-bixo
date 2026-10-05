import React, { useId } from 'react';

// 1. Tipagem para as variações e tamanhos disponíveis
export type InputVariant = 'default' | 'error' | 'success';
export type InputSize = 'sm' | 'md' | 'lg';

// 2. Interface de Props estendendo os atributos nativos do HTML <input>
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    helperText?: string;
    error?: string;
    success?: boolean;
    variant?: InputVariant;
    inputSize?: InputSize; // Nomeado como inputSize para evitar conflitos com a prop nativa 'size' de inputs
    icon?: React.ElementType;
    iconPosition?: 'left' | 'right';
    className?: string;
}

export const Input: React.FC<InputProps> = ({
    label,
    helperText,
    error,
    success,
    variant = 'default',
    inputSize = 'md',
    icon: Icon,
    iconPosition = 'left',
    className = '',
    id,
    disabled,
    ...props
}) => {
    // Gera um ID único automático se nenhum for fornecido (para acessibilidade do label)
    const generatedId = useId();
    const inputId = id || generatedId;

    // Determina a variação visual com base nas props condicionais de erro/sucesso
    const activeVariant: InputVariant = error
        ? 'error'
        : success
            ? 'success'
            : variant;

    // Mapeamentos fortificados com Record<K, V> para evitar o erro ts(7053)
    const variantStyles: Record<InputVariant, string> = {
        default: 'border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500',
        error: 'border-red-500 text-red-900 focus:border-red-500 focus:ring-red-500 bg-red-50/30',
        success: 'border-emerald-500 text-emerald-900 focus:border-emerald-500 focus:ring-emerald-500 bg-emerald-50/30',
    };

    const sizeStyles: Record<InputSize, string> = {
        sm: 'px-2.5 py-1.5 text-xs rounded-full',
        md: 'px-3.5 py-2 text-sm rounded-full',
        lg: 'px-4 py-3 text-base rounded-full',
    };

    const iconSizes: Record<InputSize, string> = {
        sm: 'w-3.5 h-3.5',
        md: 'w-4 h-4',
        lg: 'w-5 h-5',
    };

    const iconPaddingLeft: Record<InputSize, string> = {
        sm: 'pl-8',
        md: 'pl-10',
        lg: 'pl-11',
    };

    const iconPaddingRight: Record<InputSize, string> = {
        sm: 'pr-8',
        md: 'pr-10',
        lg: 'pr-11',
    };

    // Ajusta o padding do input dinamicamente se houver ícone presente
    const paddingClass = Icon
        ? iconPosition === 'left'
            ? iconPaddingLeft[inputSize]
            : iconPaddingRight[inputSize]
        : '';

    return (
        <div className="w-full flex flex-col gap-1.5 break-inside-avoid">
            {/* Label opcional vinculado ao input via htmlFor */}
            {label && (
                <label
                    htmlFor={inputId}
                    className="text-sm font-medium select-none"
                >
                    {label}
                </label>
            )}

            {/* Container do Input com posicionamento relativo para o ícone */}
            <div className="relative flex items-center">
                {Icon && (
                    <div
                        className={`absolute pointer-events-none flex items-center justify-center text-slate-400 ${iconPosition === 'left' ? 'left-3' : 'right-3'
                            }`}
                    >
                        <Icon className={iconSizes[inputSize]} />
                    </div>
                )}

                <input
                    id={inputId}
                    disabled={disabled}
                    className={`w-full bg-white border transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed ${variantStyles[activeVariant]} ${sizeStyles[inputSize]} ${paddingClass} ${className}`}
                    {...props}
                />
            </div>

            {/* Texto de erro ou mensagem de ajuda */}
            {error ? (
                <p className="text-xs text-red-600 font-medium">{error}</p>
            ) : helperText ? (
                <p className="text-xs text-slate-500">{helperText}</p>
            ) : null}
        </div>
    );
};
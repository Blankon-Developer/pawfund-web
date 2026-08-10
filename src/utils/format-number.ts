const defaultLocales: Intl.LocalesArgument = "en-US"

const numberCompact = (
  options?: Omit<Intl.NumberFormatOptions, "notation"> & {
    locals?: Intl.LocalesArgument
  }
) => {
  return new Intl.NumberFormat(options?.locals ?? defaultLocales, {
    notation: "compact",
    ...options,
    maximumFractionDigits: options?.maximumFractionDigits ?? 1,
  })
}

export { numberCompact }
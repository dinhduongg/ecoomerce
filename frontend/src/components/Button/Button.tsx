import classNames from 'classnames'
import { FC, ForwardRefExoticComponent, RefAttributes } from 'react'
import { Link, LinkProps } from 'react-router-dom'

interface Props {
  to?: string
  href?: string
  primary?: boolean
  outline?: boolean
  disabled?: boolean
  full?: boolean
  rounded?: boolean
  custom?: string
  children?: React.ReactNode
  onClick?: () => void
  passProps?: any
  type?: string
}

const Button: FC<Props> = ({
  to,
  href,
  type,
  primary = false,
  outline = false,
  disabled = false,
  full = false,
  rounded = false,
  custom,
  children,
  onClick,
  ...passProps
}) => {
  let Comp: ForwardRefExoticComponent<LinkProps & RefAttributes<HTMLAnchorElement>> | string = 'button'
  const props: any = {
    onClick,
    ...passProps
  }

  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof [key] === 'function') {
        delete props[key]
      }
    })
  }

  if (to) {
    props.to = to
    Comp = Link
  } else if (href) {
    props.href = href
    Comp = 'a'
  } else if (type) {
    Comp = 'button'
  }

  return (
    <Comp
      {...props}
      className={classNames(
        `block outline-none no-underline w-auto py-2 px-4 rounded-sm font-normal transition-all duration-300 uppercase text-sm text-center ${custom}`,
        {
          'pointer-events-none opacity-50': Boolean(disabled),
          '!w-full': Boolean(full),
          'border border-transparent bg-button-primary text-white hover:bg-button-hover hover:border-button-hover':
            Boolean(primary),
          'border border-button-primary text-button-primary hover:bg-button-primary hover:text-white': Boolean(outline),
          'rounded-[20px]': Boolean(rounded)
        }
      )}
    >
      <span>{children}</span>
    </Comp>
  )
}

export default Button

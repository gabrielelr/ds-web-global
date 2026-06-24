import * as React from 'react';

/**
 * PageControlItem — React build.
 *
 * Single segment/dot atom of the PageControl widget. Mirrors the API and
 * markup of PageControlItem.svelte and shares styles via
 * src/lib/PageControlItem/PageControlItem.css.
 */

export type PageControlItemType = 'segment' | 'point';

export interface PageControlItemProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  type?: PageControlItemType;
  active?: boolean;
}

export const PageControlItem = React.forwardRef<HTMLSpanElement, PageControlItemProps>(
  function PageControlItem({ type = 'segment', active = false, ...rest }, ref) {
    return (
      <span
        ref={ref}
        className="db-page-control-item"
        data-type={type}
        data-active={active ? 'true' : undefined}
        {...rest}
      />
    );
  }
);

export default PageControlItem;

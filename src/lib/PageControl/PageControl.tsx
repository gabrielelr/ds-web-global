import * as React from 'react';
import { PageControlItem, type PageControlItemType } from '../PageControlItem/PageControlItem';

/**
 * PageControl — React build.
 *
 * Horizontal row of PageControlItem atoms (carousel/swipe pagination
 * indicator). Renders `count` items with the item at `activeIndex`
 * highlighted. Purely presentational.
 */

export type PageControlType = PageControlItemType;

export interface PageControlProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  type?: PageControlType;
  count?: number;
  activeIndex?: number;
}

export const PageControl = React.forwardRef<HTMLDivElement, PageControlProps>(
  function PageControl(
    { type = 'segment', count = 4, activeIndex = 0, ...rest },
    ref
  ) {
    return (
      <div ref={ref} className="db-page-control" data-type={type} {...rest}>
        {Array.from({ length: count }, (_, i) => (
          <PageControlItem key={i} type={type} active={i === activeIndex} />
        ))}
      </div>
    );
  }
);

export default PageControl;

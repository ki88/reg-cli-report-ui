import React, { useCallback } from 'react';
import { Space, BreakPoint, Size } from '../../styles/variables';
import { RegVariant, RegEntity } from '../../types/reg';
import { Container } from '../Container';
import { Card, CardDimmer } from '../Card';
import { EntityContainer } from '../../containers/entity/EntityContainer';
import { ViewerContainer } from '../../containers/viewer/ViewerContainer';
import { NotificationContainer } from '../../containers/notification/NotificationContainer';
import { VGrid } from '../VGrid';
import { EntityStateContainer } from '../../containers/entityState/EntityStateContainer';

const titles: { [K in RegVariant]: string } = {
  new: 'NEW ITEMS',
  passed: 'PASSED ITEMS',
  changed: 'CHANGED ITEMS',
  deleted: 'DELETED ITEMS',
};

export type Props = {};

const gridOptions = [
  {
    media: 'screen',
    gridGap: Space * 5,
    minContentLength: 270,
  },
  {
    media: `screen and (min-width: ${BreakPoint.X_SMALL}px)`,
    gridGap: Space * 5,
    minContentLength: 300,
  },
  {
    media: `screen and (min-width: ${BreakPoint.SMALL}px)`,
    gridGap: Space * 5,
    minContentLength: 360,
  },
  {
    media: `screen and (min-width: ${BreakPoint.X_LARGE}px)`,
    gridGap: Space * 5,
    minContentLength: 540,
  },
];

const Content: React.FC<{ variant: RegVariant; entities: RegEntity[] }> = ({ variant, entities }) => {
  const notification = NotificationContainer.useContainer();
  const viewer = ViewerContainer.useContainer();

  const title = titles[variant];

  const handleClick = useCallback(
    (id: string) => {
      viewer.open(id);
    },
    [viewer],
  );

  const handleCopy = useCallback(() => {
    notification.notify('Copied URL to clipboard');
  }, [notification]);

  const entityState = EntityStateContainer.useContainer();

  if (entities.length < 1) {
    return null;
  }

  return (
    <>
      <h2 id={variant}>{title}</h2>
      <VGrid
        items={entities}
        itemKey="id"
        cellHeight={Size.CARD_OUTER_HEIGHT}
        gridOptions={gridOptions}
        dimmerCell={() => <CardDimmer variant={variant} />}>
        {({ item: entity }) => (
          <Card
            entity={entity}
            approved={entityState.getItem(entity.name).approved}
            onApprovedToggle={(approved) => entityState.updateItem(entity.name, { approved })}
            menus={[]}
            onClick={handleClick}
            onCopy={handleCopy}
          />
        )}
      </VGrid>
    </>
  );
};

export const Main: React.FC<Props> = () => {
  const entities = EntityContainer.useContainer();

  return (
    <Container>
      <h1>REPORT DETAIL</h1>
      {entities.filtering && entities.allItems.length === 0 ? (
        <>
          <h2>Not found</h2>
          <p>
            No items found that match the text entered.
            <br />
            Try filtering with different keywords :)
          </p>
        </>
      ) : (
        <>
          <Content variant="changed" entities={entities.failedItems} />
          <Content variant="new" entities={entities.newItems} />
          <Content variant="deleted" entities={entities.deletedItems} />
          <Content variant="passed" entities={entities.passedItems} />
        </>
      )}
    </Container>
  );
};

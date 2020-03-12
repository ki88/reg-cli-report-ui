import React from 'react';
import { RegData } from '../types/reg';
import { EntityStateContainer } from '../containers/entityState/EntityStateContainer';
import { EntityContainer } from '../containers/entity/EntityContainer';
import { ViewerContainer } from '../containers/viewer/ViewerContainer';
import { NotificationContainer } from '../containers/notification/NotificationContainer';
import { AnchorScrollProvider } from '../context/AnchorScrollContext';
import { WorkerClient } from '../worker-client';
import { WorkerContext } from '../context/WorkerContext';
import { SidebarContainer } from '../containers/sidebar/SidebarContainer';
import { App as Component } from './App';

export type Props = {
  data: RegData;
  worker: WorkerClient;
};

export const App: React.FC<Props> = ({ data, worker }) => (
  <AnchorScrollProvider>
    <WorkerContext.Provider value={worker}>
      <NotificationContainer.Provider>
        <EntityStateContainer.Provider>
          <EntityContainer.Provider initialState={data}>
            <SidebarContainer.Provider initialState={data.links}>
              <ViewerContainer.Provider>
                <Component />
              </ViewerContainer.Provider>
            </SidebarContainer.Provider>
          </EntityContainer.Provider>
        </EntityStateContainer.Provider>
      </NotificationContainer.Provider>
    </WorkerContext.Provider>
  </AnchorScrollProvider>
);

import { createContainer } from 'unstated-next';
import { useState, useEffect } from 'react';
import {api} from "./api";

export type EntityItemState = {
    approved: boolean
}

export type EntityStateValue = {
    getItem: (name: string) => EntityItemState;
    updateItem: (name: string, patch: Partial<EntityItemState>) => void;
};

export const EntityStateContainer = createContainer<EntityStateValue>(() => {
    const [entityState, setEntityState] = useState<any>({});

    useEffect(() => {
        async function fetch() {
            const entityState = await api.getReportData() || {};
            setEntityState(entityState);
        }

        fetch();
    }, []);

    return {
        getItem: name => entityState[name] || {},
        updateItem: (name, patch) => {
            const updatedEntityState = {
                ...entityState,
                [name]: {
                    ...entityState[name],
                    ...patch
                }
            }
            setEntityState(updatedEntityState);
            api.setReportData(updatedEntityState);
            console.log(`update item ${name}`, patch)
        }
    };
});

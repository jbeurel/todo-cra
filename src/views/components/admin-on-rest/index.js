import React, { Component } from 'react';
import { firebaseConfig } from 'src/firebase/config'
import { Admin, Resource, Delete } from 'admin-on-rest';
import { TagList, TagEdit, TagCreate } from './tags';
import { RestClient } from 'aor-firebase-client';

export default class AdminOnRest extends Component {
    render() {
        return (
            <Admin restClient={RestClient(['tags'], firebaseConfig)} >
                <Resource name="tags" list={TagList} edit={TagEdit} create={TagCreate} remove={Delete} />
            </Admin>
        );
    }
}
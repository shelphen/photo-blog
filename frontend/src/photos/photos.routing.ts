import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PhotoFormComponent} from './components/photo-form/photo-form.component';
import {PhotosComponent} from './components/photos/photos.component';
import {PhotosByTagComponent} from './components/photos-by-tag/photos-by-tag.component';

const PhotosRoutes:Routes = [
    {
        path: 'photo/add',
        component: PhotoFormComponent,
    },
    {
        path: 'photos',
        component: PhotosComponent,
    },
    {
        path: 'photos/tag/:tag',
        component: PhotosByTagComponent,
    },
];

export const PhotosRoutingProviders:any[] = [];

export const PhotosRouting:ModuleWithProviders = RouterModule.forRoot(PhotosRoutes);
import { Routes } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { SingleComponent } from './single/single.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { createComponent } from '@angular/core';
import { CreateComponent } from './create/create.component';
import { ArticleApiComponent } from './article-api/article-api.component';
import { EditComponent } from './edit/edit.component';
import { ArticleComponent } from './article/article.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path : 'articles/:id',
        component: SingleComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: "create",
        component: CreateComponent
    },
    {
        path: "edit/:id",
        component: EditComponent
    },
    {
        path: "delete/:id",
        component: ArticleComponent
    },
    {
        path: "articles-api",
        component: ArticleApiComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "register",
        component: RegisterComponent
    }
];

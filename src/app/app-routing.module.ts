import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { BlogComponent } from './pages/blog/blog.component';
import { AboutComponent } from './pages/about/about.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminBlogsComponent } from './admin/admin-blogs/admin-blogs.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'admin', component: AdminComponent, children: [{
      path: '', pathMatch: 'full', redirectTo: 'adminBlogs'
    },
    { path: 'adminCategory', component: AdminCategoryComponent },
    { path: 'adminProducts', component: AdminProductsComponent },
    { path: 'adminBlogs', component: AdminBlogsComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

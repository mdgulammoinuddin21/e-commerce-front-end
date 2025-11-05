import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Admin } from './admin/admin';
import { User } from './user/user';
import { Login } from './login/login';
import { Forbidden } from './forbidden/forbidden';
import { AuthGuard } from './_auth/auth-guard';
import { AddNewProduct } from './add-new-product/add-new-product';
import { ShowProductDetails } from './show-product-details/show-product-details';
import { ProductResolve } from './product-resolve';
import { ProductViewDetails } from './product-view-details/product-view-details';
import { BuyProduct } from './buy-product/buy-product';
import { BuyProductResolver } from './buy-product-resolver';
import { OrderConfirmation } from './order-confirmation/order-confirmation';
import { Register } from './register/register';


export const routes: Routes = [
    {path:'', component:Home},
    {path:'admin', component:Admin , canActivate:[AuthGuard] , data:{roles:['Admin']}},
    {path:'user', component:User , canActivate:[AuthGuard] , data:{roles:['User']}},
    {path:'login', component:Login},
    {path:'forbidden', component:Forbidden},
    {path:'addNewProduct', component:AddNewProduct, canActivate:[AuthGuard] , data:{roles:['Admin']},
        resolve: {
            product: ProductResolve
        }
    },
    {path:'showProductDetails', component:ShowProductDetails},
    {path:'productViewDetails', component:ProductViewDetails, resolve: { product: ProductResolve }},
    {path:'buyProduct', component:BuyProduct, canActivate:[AuthGuard] , data:{roles:['User']},
        resolve: {
            productDetails: BuyProductResolver
        }
    },
    {path:'orderConfirm', component:OrderConfirmation, canActivate:[AuthGuard] , data:{roles:['User']}},
    {path:'register', component:Register}
];

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { CodechallengemarcoSharedModule } from 'app/shared/shared.module';
import { CodechallengemarcoCoreModule } from 'app/core/core.module';
import { CodechallengemarcoAppRoutingModule } from './app-routing.module';
import { CodechallengemarcoHomeModule } from './home/home.module';
import { CodechallengemarcoEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    CodechallengemarcoSharedModule,
    CodechallengemarcoCoreModule,
    CodechallengemarcoHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    CodechallengemarcoEntityModule,
    CodechallengemarcoAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent]
})
export class CodechallengemarcoAppModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniCardComponent } from './components/card/card.component';
import { UniCardFooterComponent } from './components/card-footer/card-footer.component';
import { UniCardHeaderComponent } from './components/card-header/card-header.component';
import { UniCardSubtitleComponent } from './components/card-subtitle/card-subtitle.component';
import { UniCardTitleComponent } from './components/card-title/card-title.component';
import { UniCardContentComponent } from './components/card-content/card-content.component';
import { UniCardAvatarDirective } from './directives/card-avatar/card-avatar.directive';

const declarations = [
  UniCardComponent,
  UniCardFooterComponent,
  UniCardHeaderComponent,
  UniCardSubtitleComponent,
  UniCardTitleComponent,
  UniCardContentComponent,
  UniCardAvatarDirective,
];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule],
})
export class UniCardModule {}

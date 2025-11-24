import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';

import { Camera,ShoppingCart , ChevronLeft, ChevronRight, Check, Heart, Instagram, Save, User, Youtube, X, Twitch, Facebook,Linkedin } from 'angular-feather/icons';

// Select some icons (use an object, not an array)
const icons = {
  Camera,
  ChevronLeft,
  ChevronRight,
  Check,
  Heart,
  Instagram,
  Save,
  User,
  Youtube,
  X,
  Twitch,
  Facebook,
  Linkedin,
  ShoppingCart
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}

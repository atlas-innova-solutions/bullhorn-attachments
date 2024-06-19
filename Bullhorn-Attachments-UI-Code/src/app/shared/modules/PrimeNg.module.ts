import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SlideMenuModule } from 'primeng/slidemenu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SidebarModule } from 'primeng/sidebar';
import { MenubarModule } from 'primeng/menubar';
import { TabViewModule } from 'primeng/tabview';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { ListboxModule } from 'primeng/listbox';
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PaginatorModule } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PickListModule } from 'primeng/picklist';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MenuItemContent, MenuModule } from 'primeng/menu';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { SplitButtonModule } from 'primeng/splitbutton';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

const PrimeNgModules: any = [
    ButtonModule,
    SlideMenuModule,
    SidebarModule,
    ProgressSpinnerModule,
    TabViewModule,
    MenubarModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    ToastModule,
    InputTextModule,
    DialogModule,
    ListboxModule,
    PanelModule,
    DropdownModule,
    DividerModule,
    TableModule,
    FieldsetModule,
    CheckboxModule,
    AccordionModule,
    FieldsetModule,
    InputNumberModule,
    CalendarModule,
    CheckboxModule,
    InputTextareaModule,
    RadioButtonModule,
    PaginatorModule,
    TooltipModule,
    ToolbarModule,
    OverlayPanelModule,
    PickListModule,
    DynamicDialogModule,
    MultiSelectModule,
    MenuModule,
    TagModule,
    ChipModule,
    KeyFilterModule,
    PanelMenuModule,
    AutoCompleteModule,
    CardModule,
    ToggleButtonModule,
    AvatarModule,
    BadgeModule,
    SplitButtonModule,
    BreadcrumbModule,
    InputSwitchModule,
    InputGroupModule,
    InputGroupAddonModule,
    IconFieldModule,
    InputIconModule
];

@NgModule({
    imports: PrimeNgModules,
    exports: [PrimeNgModules]
})
export class PrimeNgModule {}

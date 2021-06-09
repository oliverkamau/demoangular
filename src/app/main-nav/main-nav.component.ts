import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu = false;
  isShowing = false;
  showSubSubMenu = false;
  isSubExpanded = false;
  isSubShowing = false;
  isSystemExpanded = false;
  isSystemShowing = false;
  showStudentSubmenu = false;
  showStaffSubmenu = false;
  showExamSubmenu = false;
  showTimetableSubmenu = false;
  showLibrarySubmenu = false;
  showFeesSubmenu = false;
  showFinanceSubmenu = false;
  showIntegrationsSubmenu = false;
  showHelpSubmenu = false;
  showReportsSubmenu = false;
  showFileSubmenu = false;
  showSystemMenu = false;
  showAccountMenu = false;
  isAccountExpanded = false;
  isAccountShowing = false;
  showAcademicMenu = false;
  isAcademicExpanded = false;
  isAcademicShowing = false;
  showPeriodMenu = false;
  isPeriodExpanded = false;
  isPeriodShowing = false;
  showTripMenu = false;
  isTripExpanded = false;
  isTripShowing = false;
  showFeeMenu = false;
  isFeeExpanded = false;
  isFeeShowing = false;
  isReceiptExpanded = false;
  isReceiptShowing = false;
  showReceiptMenu = false;
  showPettyMenu = false;
  isPettyExpanded = false;
  isPettyShowing = false;
  showAssetsMenu = false;
  isAssetsExpanded = false;
  isAssetsShowing = false;
  showStudReportMenu = false;
  isStudReportExpanded = false;
  isStudReportShowing = false;
  showTeacherMenu = false;
  isTeacherExpanded = false;
  isTeacherShowing = false;
  showAcadRepMenu = false;
  isAcadRepExpanded = false;
  isAcadRepShowing = false;
  showFeeRepMenu = false;
  isFeeRepExpanded = false;
  isFeeRepShowing = false;
  showFinalMenu = false;
  isFinalExpanded = false;
  isFinalShowing = false;



  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['/home']);
  }

  mouseenter(): void {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave(): void {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  openSubmenu(): void {

    this.showSubSubMenu = !this.showSubSubMenu;
    this.isSubExpanded = !this.isSubExpanded;
    this.isSubShowing = !this.isSubShowing;

  }

  openSystemmenu(): void {
    this.showSystemMenu = !this.showSystemMenu;
    this.isSystemExpanded = !this.isSystemExpanded;
    this.isSystemShowing = !this.isSystemShowing;
  }

  openAccountmenu(): void {
    this.showAccountMenu = !this.showAccountMenu;
    this.isAccountExpanded = !this.isAccountExpanded;
    this.isAccountShowing = !this.isAccountShowing;
  }

  openAcademicmenu(): void {
    this.showAcademicMenu = !this.showAcademicMenu;
    this.isAcademicExpanded = !this.isAcademicExpanded;
    this.isAcademicShowing = !this.isAcademicShowing;
  }

  openPeriodmenu(): void {
    this.showPeriodMenu = !this.showPeriodMenu;
    this.isPeriodShowing = !this.isPeriodShowing;
    this.isPeriodExpanded = !this.isPeriodExpanded
  }

  openTripmenu(): void {
    this.showTripMenu = !this.showTripMenu;
    this.isTripExpanded = !this.isTripExpanded;
    this.isTripShowing = !this.isTripShowing;
  }

  openFeemenu(): void {
    this.showFeeMenu = !this.showFeeMenu;
    this.isFeeExpanded = !this.isFeeExpanded;
    this.isFeeShowing = !this.isFeeShowing;
  }

  openReceiptmenu(): void{
    this.showReceiptMenu = !this.showReceiptMenu;
    this.isReceiptExpanded = !this.isReceiptExpanded;
    this.isReceiptShowing = !this.isReceiptShowing;
  }

  openPettymenu(): void{
    this.showPettyMenu = !this.showPettyMenu;
    this.isPettyExpanded = !this.isPettyExpanded;
    this.isPettyShowing = !this.isPettyShowing;
  }

  openAssetsmenu(): void{
    this.showAssetsMenu = !this.showAssetsMenu;
    this.isAssetsExpanded = !this.isAssetsExpanded;
    this.isAssetsShowing = !this.isAssetsShowing;
  }

  openStudReportmenu(): void{
    this.showStudReportMenu = !this.showStudReportMenu;
    this.isStudReportExpanded = !this.isStudReportExpanded;
    this.isStudReportShowing = !this.isStudReportShowing;
  }

  openTeachermenu(): void{
    this.showTeacherMenu = !this.showTeacherMenu;
    this.isTeacherExpanded = !this.isTeacherExpanded;
    this.isTeacherShowing = !this.isTeacherShowing;
  }

  openAcadRepmenu(): void{
    this.showAcadRepMenu = !this.showAcadRepMenu;
    this.isAcadRepExpanded = !this.isAcadRepExpanded;
    this.isAcadRepShowing = !this.isAcadRepShowing;
  }

  openFeeRepmenu(): void{
    this.showFeeRepMenu = !this.showFeeRepMenu;
    this.isFeeRepExpanded = !this.isFeeRepExpanded;
    this.isFeeRepShowing = !this.isFeeRepShowing;
  }

  openFinalmenu(): void{
    this.showFinalMenu = !this.showFinalMenu;
    this.isFinalExpanded = !this.isFinalExpanded;
    this.isFinalShowing = !this.isFinalShowing;
  }
}

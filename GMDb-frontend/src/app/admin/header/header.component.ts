import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  dropdownTitle: string = 'Add M | A | G'; // Default title
  dropdownTitle2: string = 'Update M | A | G';

  // Function to update the dropdown title based on the selected option
  updateDropdownTitle(selectedOption: string) {
    this.dropdownTitle = selectedOption;
  }
}

import { Component} from '@angular/core';
import 'rxjs/add/operator/filter';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent  {
  name = 'Algo App';
}

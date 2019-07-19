import { TaskBoardComponent } from "./task-board.component";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "src/app/shared/components/page-not-found/page-not-found.component";

const routes: Routes = [{
    path: "tasks",
    children: [
        {
            path: '',
            component: TaskBoardComponent
        },
        { path: '**', component: PageNotFoundComponent }
    ]
}];

export const TaskRoutes = RouterModule.forChild(routes);

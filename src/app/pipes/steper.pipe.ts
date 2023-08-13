import { Pipe, PipeTransform } from '@angular/core';
import { StepRoute } from '../mocks/steps';

type SteperAction = "GetSteps" | "GetProgress";

@Pipe({
  name: 'steper',
  standalone: true
})
export class SteperPipe implements PipeTransform {

  transform(stepsRoutes: StepRoute[], action: SteperAction, activeStepRoute?: string): number {

    const stepGroupsIndexes: number[] = stepsRoutes.map((step, index) => step.isStepIntro && index)
      .filter((stepIndex) => stepIndex !== undefined) as number[];

    if (action === "GetSteps") return stepGroupsIndexes.length - 1;
    else {

      // Get the percentage of each group from 100%
      const stepGroupPercentage: number = 100 / stepGroupsIndexes.length;
      // Get the current step index
      const currentRouteIndex: number = stepsRoutes.findIndex(elem => elem.stepRoute === activeStepRoute);

      // Get the index of the next step group in the stepGroupsIndexes
      const auxNextStepGroupIndex: number = stepGroupsIndexes.findIndex(groupIndex => groupIndex > currentRouteIndex);

      // Get the index of the next step group; If it's the last one then return the last step route index
      const nextStepGroupIndex: number = auxNextStepGroupIndex > -1 ? stepGroupsIndexes[auxNextStepGroupIndex] : stepsRoutes.length - 1;
      // Get the index of the previous step group: If there's not one then return the last step group index from stepGroupsIndexes
      const previousStepGroupIndex: number = auxNextStepGroupIndex > -1 ? stepGroupsIndexes[auxNextStepGroupIndex - 1] : stepGroupsIndexes[stepGroupsIndexes.length - 1];

      // Get the number of steps of the current group
      let currentStepGroupStepsNumber: number = nextStepGroupIndex - previousStepGroupIndex;
      // Add one step if the current group is the last one
      if (auxNextStepGroupIndex === -1) currentStepGroupStepsNumber++;

      // Get the percentage of each step in the current group
      const currentStepGroupStepPercentage: number = stepGroupPercentage / currentStepGroupStepsNumber;
      // Get the number of steps completed in the current group
      let currentStepGroupStepsCompleted: number = Math.abs(previousStepGroupIndex - currentRouteIndex) + 1;

      // Get the percentage of the completed steps of the current group
      const completedCurrentStepGroupPercentage: number = currentStepGroupStepPercentage * currentStepGroupStepsCompleted;

      // Get the number of the completed step groups
      const completedStepGroups: number = stepsRoutes.slice(0, currentRouteIndex + 1).filter(step => step.isStepIntro).length - 1;
      // Get the percentage of the completed step groups
      const completedStepGroupsPercentage = stepGroupPercentage * completedStepGroups;

      const test = completedStepGroupsPercentage + completedCurrentStepGroupPercentage;

      return test;
    }
  }

  getNextPrevStepGroup(startPosition: number) {

  }

}

export interface StepRoute {
    stepRoute: string;
    isStepIntro?: boolean;
}

export const stepsRoutes: StepRoute[] = [
    {
        stepRoute: 'about-your-home',
        isStepIntro: true
    },
    {
        stepRoute: 'structure'
    },
    {
        stepRoute: 'location'
    },
    {
        stepRoute: 'features'
    },
    {
        stepRoute: 'stand-out',
        isStepIntro: true
    },
    {
        stepRoute: 'amenities'
    },
    {
        stepRoute: 'photos'
    },
    {
        stepRoute: 'title'
    },
    {
        stepRoute: 'description'
    },
    {
        stepRoute: 'finish-setup',
        isStepIntro: true
    },
    {
        stepRoute: 'price'
    },
    {
        stepRoute: 'receipt'
    }
]
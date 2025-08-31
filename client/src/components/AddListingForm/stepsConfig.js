import IntroStep from "./steps/IntroStep";
import BasicInfoStep from "./steps/BasicInfoStep";
import ContactStep from "./steps/ContactStep";
import LocationStep from "./steps/LocationStep";
import HoursStep from "./steps/HoursStep";
import PricingStep from "./steps/PricingStep";
import TagsStep from "./steps/TagsStep";
import ImagesStep from "./steps/ImagesStep";
import ReviewStep from "./steps/ReviewStep";

export const steps = [
    { title: "Intro", component: IntroStep },
    { title: "Basic Info", component: BasicInfoStep },
    { title: "Contact", component: ContactStep },
    { title: "Location", component: LocationStep },
    { title: "Hours", component: HoursStep },
    { title: "Pricing", component: PricingStep },
    { title: "Tags", component: TagsStep },
    { title: "Images", component: ImagesStep },
];
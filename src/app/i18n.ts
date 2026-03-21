import { enUS as dataGridEnUS } from "@mui/x-data-grid/locales";
import { esES as dataGridEsES } from "@mui/x-data-grid/locales";
import { enUS as pickersEnUS } from "@mui/x-date-pickers/locales";
import { esES as pickersEsES } from "@mui/x-date-pickers/locales";
import { enUS as coreEnUS } from "@mui/material/locale";
import { esES as coreEsES } from "@mui/material/locale";

export type Lang = "en" | "es";

export type Translations = {
  [K in Lang]: {
    finish: string;
    loadingNutritionPlan: string;
    noActiveNutritionPlan: string;
    noBlocksForAthlete: string;
    optionsLabel: string;
    athlete: string;
    planTitle: string;
    mealsPerDay: string;
    optionName: string;
    optionDescription: string;
    addOption: string;
    removeOption: string;
    foodsCaption: string;
    addFood: string;
    selectOrSearchFood: string;
    grams: string;
    weekdays: string[];
    nutritionWizardStep1: string;
    nutritionWizardStep2: string;
    nutritionWizardStep3: string;
    nutritionWizardStep4: string;
    nutritionWizardStep5: string;
    nutritionWizardRestrictionHint: string;
    nutritionWizardAthleteStepHint: string;
    weeklyPlanHint: string;
    deleteDayExerciseTitle: string;
    deleteDayExerciseConfirm: string;
    deleteDayExerciseWarning: string;
    remove: string;
    // NutritionPlanWizard: Plan Duplication
    activePlanExistsTitle: string;
    activePlanExistsText: string;
    confirm: string;
    loadingBlocks: string;
    loadingBlockDetails: string;
    followup: string;
    followupActivity: string;
    followupBlock: string;
    blockCompletionThreshold: string;
    blockNumberLabel: string;
    blockCreatedAtLabel: string;
    blockCompletionPercentLabel: string;
    blockCompletionInfo: string;
    followUpTabInactivity: string;
    dataGridLocale: any;
    neverLabel: string;
    pickersLocale: any;
    coreLocale: any;
    athleteFirstName: string;
    athleteLastName: string;
    email: string;
    lastActivityDate: string;
    daysSinceLastActivity: string;
    periodUnitLabel: string;
    daysLabel: string;
    weeksLabel: string;
    monthsLabel: string;
    unitsLabel: string;
    searchButton: string;
    datagridNoRowsLabel: string;
    datagridRowsPerPage: string;
    // --- UserTable additions:
    notesPopoverTitle: string;
    notesPopoverTooltip: string;
    noDaysForWeek: string;
    // Future Payment Dialog additions:
    futurePaymentDialogMessage: (athleteName: string) => string;
    futurePaymentDialogTitle: string;
    futurePaymentDialogAmount: string;
    futurePaymentDialogDate: string;
    futurePaymentDialogYes: string;
    futurePaymentDialogNo: string;
    // ---
    measurementsChartMonthsShort: string[];
    athleteNotesModalTitle: (firstName: string, lastName?: string) => string;
    noteButtonTitle: (firstName: string, lastName?: string) => string;
    measurementsMenu: string;
    measurementsTab: string;
    sexLabel: string;
    sexMale: string;
    sexFemale: string;
    sexOther: string;
    // Password page translations (new):
    manageUsersQuickFilterNoPlan: string;
    manageUsersQuickFilterNoPassword: string;
    noExercisesForDay: string;
    passwordTitle: string;
    passwordSnackbarInvalidOrExpired: string;
    passwordSnackbarRequirements: string;
    passwordSnackbarMismatch: string;
    passwordSnackbarError: string;
    passwordInvalidOrExpired: string;
    passwordLoadingUser: string;
    passwordLabel: string;
    passwordRepeatLabel: string;
    passwordHelperText: string;
    passwordHelperTextMismatch: string;
    passwordButton: string;

    blockNoContent: string;
    blockNoWeeks: string;
    blockNoDaysInWeek: string;
    blockNoExerciseForDay: string;
    // ManageBlocks Page
    copyWeekError: string;
    deleteBlockTooltip: string;
    hideBlock: string;
    publishBlock: string;
    weekLabel: string;
    moveWeekBack: string;
    moveWeekForward: string;
    copyWeekTooltip: string;
    deleteWeekTooltip: string;
    series: string;
    copyWeekTitle: string;
    copyWeekConfirm: (from: string | number, to: string | number) => string;
    cancel: string;
    copy: string;
    deleteWeekTitle: string;
    deleteWeekConfirm: (week: string | number) => string;
    delete: string;
    hideBlockConfirm: string;
    publishBlockConfirm: string;
    deleteBlockTitle: string;
    deleteBlockConfirm: (blockLabel: string) => string;
    thisBlock: string;
    seriesSingular: string;
    seriesPlural: string;
    loginTitle: string;
    loginUsernameLabel: string;
    athletes: string;
    dashboard: string;
    activeAthletesTitle: string;
    activeAthletesInterval: string;
    actualRevenueTitle: string;
    actualRevenueInterval: string;
    futureRevenueTitle: string;
    futureRevenueInterval: string;
    overviewTitle: string;
    detailsTitle: string;
    unpaidRevenueTitle: string;
    unpaidRevenueLabel: string;
    loginUsernamePlaceholder: string;
    loginPasswordLabel: string;
    loginPasswordPlaceholder: string;
    loginLoading: string;
    loginFailed: string;
    loginUsernameRequired: string;
    signinPasswordTooShort: string;
    signinLoginFailed: string;
    signinLoginSuccess: string;
    unexpectedResponse: string;
    couldNotConnect: string;
    signinTitle: string;
    signinEmailLabel: string;
    signinEmailPlaceholder: string;
    signinPasswordLabel: string;
    signinPasswordPlaceholder: string;
    signinRememberMe: string;
    signinButton: string;
    signinForgotPassword: string;
    signinDividerOr: string;
    signinWithGoogle: string;
    signinWithFacebook: string;
    signinNoAccount: string;
    signinSignup: string;
    dashboardTitle: string;
    adminMenu: string;
    manageUsers: string;
    manageExercises: string;
    createTrainingBlocks: string;
    previousWeek: string;
    ds: string;
    nextWeek: string;
    block: string;
    week: string;
    day: string;
    blockWeekDayLabel: (block: string | number, week: string | number, day: string | number) => string;
    blockWeekLabel: (block: string | number, week: string | number) => string;
    exercise: string;
    createUserPaymentAmountLabel: string;
    createUserFrequencyMonthly: string;
    createUserFrequencyQuarterly: string;
    createUserFrequencyYearly: string;
    muscleGroup: string;
    muscleGroupsLabel: string;
    reps: string;
    weight: string;
    rir: string;
    progress: string;
    showLegend: string;
    progressLegend: string;
    progressLegendMoreWeightMoreReps: string;
    progressLegendSameWeightMoreReps: string;
    progressLegendMoreWeightSameReps: string;
    progressLegendLessWeightMoreReps: string;
    progressLegendMoreWeightLessReps: string;
    progressLegendSameWeightLessReps: string;
    progressLegendLessWeightLessReps: string;
    progressLegendNoProgress: string;
    progressLegendMoreRepsOnly: string;
    progressLegendLessRepsOnly: string;
    progressLegendMoreWeightOnly: string;
    progressLegendLessWeightOnly: string;
    legend1: string;
    legend2: string;
    legend3: string;
    legend4: string;
    legend5: string;
    legend6: string;
    legend7: string;
    legend8: string;
    legend9: string;
    close: string;
    of: string;
    calendarAria: (idx: number) => string;
    athleteSeparator: string;
    language: string;
    nameDefault: string;
    progressRLabel: string;
    progressWLabel: string;
    lastWeekShort: string;
    loadingAthletes: string;
    creatingBlock: string;
    blockCreated: string;
    loadingScheduledTraining: string;
    manageUsersTableName: string;
    manageUsersTableEmail: string;
    manageUsersTableStatus: string;
    manageUsersTableActions: string;
    manageUsersModalHeader: string;
    manageUsersModalFirstName: string;
    manageUsersModalLastName: string;
    manageUsersModalName: string;
    manageUsersModalUsername: string;
    manageUsersModalEmail: string;
    manageUsersModalId: string;
    manageUsersModalLastLogin: string;
    manageUsersModalRole: string;
    manageUsersStatusEmpty: string;
    manageUsersActionsEmpty: string;
    accessDenied: string;
    accessDeniedDesc: string;
    paymentsTableDate: string;
    paymentsTableAmount: string;
    paymentsTablePaid: string;
    paymentsTablePaidHeader: string;
    paymentsTableUnpaid: string;
    paymentsTableActions: string;
    infoTab: string;
    paymentsTab: string;
    blocksTab: string;
    nutritionTab: string;
    addPaymentDialogTitle: string;
    addPaymentDialogDate: string;
    addPaymentDialogAmount: string;
    addPaymentDialogCancel: string;
    addPaymentDialogAdd: string;
    addPaymentDialogShowOnlyPending: string;
    addPaymentButton: string;
    paymentAdded: string;
    subscriptionAmountLabel: string;
    subscriptionFrequencyLabel: string;
    subscriptionFrequencyMonthly: string;
    subscriptionFrequencyQuarterly: string;
    subscriptionFrequencyYearly: string;
    editFrequencyTooltip: string;
    editAmountTooltip: string;
    hideUserDialogTitle: string;
    hideUserDialogHideMsg: string;
    hideUserDialogUnhideMsg: string;
    hideUserDialogCancel: string;
    hideUserDialogConfirm: string;
    actionsMarkPayed: string;
    actionsMarkUnpayed: string;
    actionsRemovePayment: string;
    actionsMarkPayedTooltip: string;
    actionsMarkUnpayedTooltip: string;
    actionsRemovePaymentTooltip: string;
    actionsConfirmYes: string;
    actionsConfirmNo: string;
    manageUsersFilterOnlyUnpaid: string;
    manageUsersAddPaymentInvalid: string;
    manageUsersAddPaymentFail: string;
    manageUsersAddPayment: string;
    manageUsersAddPaymentAdding: string;
    manageUsersAddPaymentCreate: string;
    manageUsersAddPaymentCancel: string;
    manageUsersAddPaymentNone: string;
    manageUsersQuickFilters: string;
    manageUsersQuickFilterAll: string;
    manageUsersQuickFilterDue: string;
    manageUsersQuickFilterNoFuture: string;
    manageUsersQuickFilterAllActive: string;
    manageUsersQuickFilterHidden: string;
    sendWelcomeEmail: string;
    sendWelcomeEmailSuccess: string;
    sendWelcomeEmailError: string;
    sendWelcomeEmailConfirm: (name: string, email: string) => string;
    manageUsersTableEmpty: string;
    manageUsersTableShowing: string;
    hideUser: string;
    unhideUser: string;
    hiddenUserStatus: string;
    adminMenuHome: string;
    adminMenuAthletes: string;
    adminMenuSettings: string;
    adminMenuAbout: string;
    adminMenuFeedback: string;
    adminMenuExercises: string;
    adminMenuTrainingBlocks: string;
    adminMenuCreateBlock: string;
    adminMenuManageBlocks: string;
    nutritionMenu: string;
    nutrientsMenu: string;
    elaborations: string;
    editFieldTooltip: string;
    wizardAddExercise: string;
    wizardNoExercises: string;
    wizardRemoveExercise: string;
    wizardAddDropsetCheckbox: string;
    wizardSeriesLabel: string;
    wizardSeriesCopy: string;
    wizardSeriesAdd: string;
    wizardSeriesRemove: string;
    wizardMinReps: string;
    wizardMaxReps: string;
    wizardMinRIR: string;
    wizardMaxRIR: string;
    wizardSeriesNotes: string;
    wizardDropsetNotes: string;
    wizardDragSeries: string;
    wizardDragExercise: string;
    createBlockWizardStepConfig: string;
    createBlockWizardStepDesign: string;
    createBlockWizardStepSummary: string;
    createBlockWizardAthleteLabel: string;
    createBlockWizardAthletePlaceholder: string;
    createBlockWizardWeeksLabel: string;
    createBlockWizardDaysPerWeekLabel: string;
    createBlockWizardDesignStepText: string;
    createBlockWizardSummaryStepText: string;
    createBlockWizardBackButton: string;
    createBlockWizardFinishButton: string;
    createBlockWizardNextButton: string;
    createBlockWizardStep1Info: string;
    blockVisibilityLabel: string;
    blockVisibilityImmediately: string;
    blockVisibilityNotYet: string;
    trainingTab: string;
    trainingTableExercise: string;
    trainingTableSeries: string;
    trainingTableDS: string;
    trainingTableWeight: string;
    trainingTableReps: string;
    trainingTableMinMaxReps: string;
    trainingTableRIR: string;
    trainingTableMinMaxRIR: string;
    trainingTableProgress: string;
    exercises: string;
    createAthlete: string;
    dropsetAbbr: string;
    repsMin: string;
    repsMax: string;
    rirMin: string;
    rirMax: string;
    notes: string;
    updateDsError: string;
    setDsOffTitle: string;
    setDsOnTitle: string;
    trainerNoteLabel: string;
    athleteNoteLabel: string;
    athleteDataGroup: string;
    min: string;
    max: string;
    networkOrClientError: string;
    networkOrClientErrorCreateAthlete: string;
    usernameTakenError: string;
    emailTakenError: string;
    invalidEmailError: string;
    createUserFrequencyLabel: string;
    searchUserTablePlaceholder: string;

    // Measurements
    measurementsTitle: string;
    measurementsAdd: string;
    measurementsColumnId: string;
    measurementsColumnDate: string;
    measurementsColumnWeight: string;
    measurementsColumnNeck: string;
    measurementsColumnArm: string;
    measurementsColumnWaist: string;
    measurementsColumnAbdomen: string;
    measurementsColumnHip: string;
    measurementsColumnThigh: string;
    measurementsColumnCalfMuscle: string;
    measurementsLoading: string;
    measurementsEmpty: string;
    measurementsSaving: string;
    measurementsDeletedSuccess: string;
    measurementsModalTitle: string;
    measurementsModalCancel: string;
    measurementsDeleteConfirm: string;
    measurementsDeleted: string;
    measurementsDeleteError: string;
    measurementsDelete: string;
    measurementsSaveError: string;

    // Muscle group translations
    muscleGroupQuadriceps: string;
    muscleGroupHamstring: string;
    muscleGroupGlute: string;
    muscleGroupAdductor: string;
    muscleGroupCalf: string;
    muscleGroupForearm: string;
    muscleGroupBiceps: string;
    muscleGroupTriceps: string;
    muscleGroupLateralDelt: string;
    muscleGroupPosteriorDelt: string;
    muscleGroupAnteriorDelt: string;
    muscleGroupPectoral: string;
    muscleGroupClavicularPec: string;
    muscleGroupUpperBack: string;
    muscleGroupLat: string;
    muscleGroupLowerBack: string;
    muscleGroupAbdomen: string;
    emptyValue: string;
    weekProgressLabel: string;
    percentLabel: string;
    weeklyProgressTitle: string;
    followUpInfoBox: string;
    logout: string;

    // ---- Nutrient group and nutrient field translations
    nutrientGroupComposition: string;
    nutrientGroupVitamins: string;
    nutrientGroupMinerals: string;
    nutrientGroupAminoAcids: string;
    nutrientGroupAlkalinity: string;

    nutrientCalories: string;
    nutrientProtein: string;
    nutrientFat: string;
    nutrientCarbohydrates: string;
    nutrientWater: string;
    nutrientNitrogen: string;

    nutrientVitaminA_ui: string;
    nutrientVitaminB1_mcg: string;
    nutrientVitaminB2_mcg: string;
    nutrientVitaminC_mcg: string;
    nutrientNiacin_mcg: string;

    nutrientSodium_mg: string;
    nutrientPotassium_mg: string;
    nutrientCalcium_mg: string;
    nutrientMagnesium_mg: string;
    nutrientIron_mg: string;
    nutrientCopper_mg: string;
    nutrientPhosphorus_mg: string;
    nutrientSulfur_mg: string;
    nutrientChloride_mg: string;

    nutrientPhenylalanine_mg: string;
    nutrientIsoleucine_mg: string;
    nutrientLeucine_mg: string;
    nutrientLysine_mg: string;
    nutrientMethionine_mg: string;
    nutrientThreonine_mg: string;
    nutrientTryptophan_mg: string;
    nutrientValine_mg: string;

    nutrientAcid: string;
    nutrientAlcal: string;

    nutritionPlan: string;
    back: string;
    next: string;
  };
};

export const translations: Translations = {
  en: {
    activePlanExistsTitle: "Active Plan Detected",
    activePlanExistsText: "This athlete already has an active nutrition plan. The current plan will be archived, do you want to continue?",
    confirm: "Confirm",
    finish: "Finish",
    optionsLabel: "Options:",
    athlete: "Athlete",
    planTitle: "Plan title",
    mealsPerDay: "Meals per day",
    optionName: "Option name",
    optionDescription: "Option description",
    mealLabel: "Meal",
    addMeal: "Add meal",
    removeMeal: "Remove meal",
    addOption: "Add option",
    removeOption: "Remove option",
    foodsCaption: "Foods",
    addFood: "Add food",
    selectOrSearchFood: "Select or search food",
    grams: "Grams",
    weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    loadingBlocks: "Loading blocks...",
    loadingNutritionPlan: "Loading nutrition plan...",
    noBlocksForAthlete: "No blocks found for this athlete.",
    weeklyPlanHint: "Copy your template day to the week, then edit specific days if needed.",
    loadingBlockDetails: "Loading block details...",
    followup: "Follow-up",
    followupActivity: "Activity",
    followupBlock: "Last block",
    blockCompletionThreshold: "Completion %",
    blockNumberLabel: "Block #",
    blockCreatedAtLabel: "Created on",
    blockCompletionPercentLabel: "Completion %",
    blockCompletionInfo: "Shows athletes whose last block has a completion percentage equal to or higher than specified. You should schedule a new block for these athletes soon.",
    followUpTabInactivity: "Inactivity",
    dataGridLocale: dataGridEsES,
    // --- Future Payment Dialog additions:
    futurePaymentDialogMessage: (athleteName: string) => `The current payment has been paid. Do you want to create a future payment for ${athleteName}?`,
    futurePaymentDialogTitle: "Create future payment",
    futurePaymentDialogAmount: "Next payment amount",
    futurePaymentDialogDate: "Next payment due date",
    futurePaymentDialogYes: "Yes",
    futurePaymentDialogNo: "No",
    neverLabel: "Never",
    pickersLocale: pickersEnUS,
    coreLocale: coreEnUS,
    athleteFirstName: "First name",
    athleteLastName: "Last name",
    email: "Email",
    lastActivityDate: "Last activity date",
    daysSinceLastActivity: "Days since last activity",
    periodUnitLabel: "Period unit",
    daysLabel: "Day(s)",
    weeksLabel: "Week(s)",
    monthsLabel: "Month(s)",
    unitsLabel: "Units",
    searchButton: "Search",
    datagridNoRowsLabel: "No rows",
    datagridRowsPerPage: "Rows per page:",
    // Added for UserTable/Popover:
    notesPopoverTitle: "Notes",
    notesPopoverTooltip: "View Notes",
    noDaysForWeek: "No days available for this week.",
    measurementsChartMonthsShort: [
      "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
      "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ],
    athleteNotesModalTitle: (firstName: string, lastName?: string) => `Notes for ${(firstName ?? "") + (lastName ? " " + lastName : "")}`,

    noteButtonTitle: (firstName: string, lastName?: string) => `${(firstName ?? "") + (lastName ? " " + lastName : "") || "Athlete"}'s notes`,
    measurementsMenu: "Measurements",
    sexLabel: "Sex",
    sexMale: "Male",
    sexFemale: "Female",
    sexOther: "Other",
    manageUsersQuickFilterNoPlan: "No plan",
    noActiveNutritionPlan: "No active nutrition plan found for this athlete.",
    manageUsersQuickFilterNoPassword: "Users without password",
    noExercisesForDay: "No exercises for this day.",
    // Password page translations (new)
    passwordTitle: "Create password",
    passwordSnackbarInvalidOrExpired: "Invalid or expired password reset link.",
    passwordSnackbarRequirements: "Password does not meet requirements.",
    passwordSnackbarMismatch: "Passwords do not match.",
    passwordSnackbarError: "An error occurred. Please try again or contact support.",
    passwordInvalidOrExpired: "Invalid or expired password reset link.",
    passwordLoadingUser: "Loading user...",
    passwordLabel: "Password",
    passwordRepeatLabel: "Repeat password",
    passwordHelperText: "At least 6 characters, uppercase, lowercase, and a number",
    passwordHelperTextMismatch: "Passwords do not match",
    passwordButton: "Save password",

    blockNoContent: "No block content available.",
    blockNoWeeks: "No weeks in this block.",
    blockNoDaysInWeek: "No days in this week.",
    blockNoExerciseForDay: "No exercises for this day.",
    copyWeekError: "An error occurred copying the week.",
    deleteBlockTooltip: "Delete block",
    hideBlock: "Hide block",
    publishBlock: "Publish block",
    weekLabel: "Week",
    moveWeekBack: "Move week back",
    moveWeekForward: "Move week forward",
    copyWeekTooltip: "Copy week",
    deleteWeekTooltip: "Delete week",
    series: "Series",
    copyWeekTitle: "Copy week",
    copyWeekConfirm: (from, to) => `Are you sure you want to copy week ${from}? This will move all subsequent weeks forward and create a new week ${to} with the same days, exercises, series and values.`,
    cancel: "Cancel",
    copy: "Copy",
    deleteWeekTitle: "Delete week",
    deleteWeekConfirm: (week) => `Are you sure you want to delete week ${week}?`,
    delete: "Delete",
    hideBlockConfirm: "The athlete will no longer be able to see this block. Are you sure?",
    publishBlockConfirm: "The athlete will be able to see the block from now on.",
    deleteBlockTitle: "Delete block",
    deleteBlockConfirm: (blockLabel) => `Are you sure you want to delete ${blockLabel}? All weeks and associated data will be deleted.`,
    thisBlock: "this block",
    seriesSingular: "series",
    seriesPlural: "series",
    loginTitle: "Sign in",
    loginUsernameLabel: "Username",
    athletes: "Athletes",
    dashboard: "Dashboard",
    activeAthletesTitle: "Active athletes",
    activeAthletesInterval: "Active athletes per month",
    actualRevenueTitle: "Actual revenue",
    actualRevenueInterval: "Monthly revenue (last 12 months)",
    futureRevenueTitle: "Future revenue",
    futureRevenueInterval: "Expected unpaid revenue (next 12 months)",
    overviewTitle: "Overview",
    detailsTitle: "Details",
    unpaidRevenueTitle: "Unpaid revenue",
    unpaidRevenueLabel: "Total overdue (unpaid) revenue",
    loginUsernamePlaceholder: "Enter your username",
    loginPasswordLabel: "Password",
    loginPasswordPlaceholder: "Enter your password",
    loginLoading: "Logging in...",
    loginFailed: "Login failed",
    loginUsernameRequired: "Please enter your username.",
    signinPasswordTooShort: "Password must be at least 6 characters long.",
    signinLoginFailed: "Authentication failed",
    signinLoginSuccess: "Successfully signed in. Redirecting...",
    unexpectedResponse: "Unexpected response.",
    couldNotConnect: "Could not connect to server.",
    signinTitle: "Sign in",
    signinEmailLabel: "Email",
    signinEmailPlaceholder: "your@email.com",
    signinPasswordLabel: "Password",
    signinPasswordPlaceholder: "••••••",
    signinRememberMe: "Remember me",
    signinButton: "Sign in",
    signinForgotPassword: "Forgot your password?",
    signinDividerOr: "or",
    signinWithGoogle: "Sign in with Google",
    signinWithFacebook: "Sign in with Facebook",
    signinNoAccount: "Don't have an account?",
    signinSignup: "Sign up",
    dashboardTitle: "Athlete Dashboard",
    adminMenu: "Admin Menu",
    manageUsers: "Manage Users",
    manageExercises: "Manage Exercises",
    createTrainingBlocks: "Create Training Blocks",
    previousWeek: "Previous week",
    ds: "DS",
    nextWeek: "Next week",
    block: "Block",
    blockWeekDayLabel: (block, week, day) => `Block ${block} / Week ${week} / Day ${day}`,
    blockWeekLabel: (block, week) => `Block ${block} / Week ${week}`,
    week: "Week",
    day: "Day",
    exercise: "Exercise",
    exercises: "Exercises",
    createUserPaymentAmountLabel: "Payment amount",
    createUserFrequencyMonthly: "Monthly",
    createUserFrequencyQuarterly: "Quarterly",
    createUserFrequencyYearly: "Yearly",
    muscleGroup: "Muscle Group",
    muscleGroupsLabel: "Muscle groups",
    reps: "Reps",
    weight: "Weight (kg)",
    rir: "RIR",
    progress: "Progress",
    showLegend: "Show progress legend",
    progressLegend: "Progress Legend",
    progressLegendMoreWeightMoreReps: "More weight and more reps",
    progressLegendSameWeightMoreReps: "Same weight, more reps",
    progressLegendMoreWeightSameReps: "More weight, same reps",
    progressLegendLessWeightMoreReps: "Less weight, more reps",
    progressLegendMoreWeightLessReps: "More weight, less reps",
    progressLegendSameWeightLessReps: "Same weight, less reps",
    progressLegendLessWeightLessReps: "Less weight and less reps",
    progressLegendNoProgress: "No progress",
    progressLegendMoreRepsOnly: "More reps",
    progressLegendLessRepsOnly: "Less reps",
    progressLegendMoreWeightOnly: "More weight",
    progressLegendLessWeightOnly: "Less weight",
    legend1: "Both reps and weight positive",
    legend2: "One positive, other neutral",
    legend3: "One positive, other negative",
    legend4: "One negative, other neutral",
    legend5: "Both metrics negative",
    legend6: "Both metrics neutral",
    legend7: "Metric increased",
    legend8: "Metric unchanged",
    legend9: "Metric decreased",
    close: "Close",
    of: "of",
    calendarAria: (idx: number) => `Set date for day ${idx + 1}`,
    athleteSeparator: "|",
    language: "Language",
    nameDefault: "John Doe",
    progressRLabel: "R",
    progressWLabel: "W",
    lastWeekShort: "→",
    loadingAthletes: "Loading athletes...",
    creatingBlock: "Creating block...",
    blockCreated: "Block created!",
    loadingScheduledTraining: "Loading scheduled training...",
    manageUsersTableName: "Name",
    manageUsersTableEmail: "Email",
    manageUsersTableStatus: "Status",
    manageUsersTableActions: "Actions",
    manageUsersModalHeader: "Athlete Details",
    manageUsersModalFirstName: "First name",
    manageUsersModalLastName: "Last name",
    manageUsersModalName: "Name",
    manageUsersModalUsername: "Username",
    manageUsersModalEmail: "Email",
    manageUsersModalId: "ID",
    manageUsersModalLastLogin: "Last access",
    manageUsersModalRole: "Role",
    manageUsersStatusEmpty: "",
    manageUsersActionsEmpty: "",
    accessDenied: "Access Denied",
    accessDeniedDesc: "Only admins can manage users.",
    manageUsersFilterOnlyUnpaid: "Only unpaid",
    paymentsTableDate: "Date",
    paymentsTableAmount: "Amount",
    paymentsTablePaid: "Paid",
    paymentsTablePaidHeader: "Paid",
    paymentsTableUnpaid: "Unpaid",
    paymentsTableActions: "Actions",
    infoTab: "Info",
    paymentsTab: "Payments",
    blocksTab: "Blocks",
    nutritionTab: "Nutritional plan",
    addPaymentDialogTitle: "New Payment",
    addPaymentDialogDate: "Due Date",
    addPaymentDialogAmount: "Amount (€)",
    addPaymentDialogCancel: "Cancel",
    addPaymentDialogAdd: "Add",
    addPaymentDialogShowOnlyPending: "Show only pending payments",
    addPaymentButton: "Add payment",
    paymentAdded: "Payment added",
    subscriptionAmountLabel: "Amount (€)",
    subscriptionFrequencyLabel: "Frequency",
    subscriptionFrequencyMonthly: "Monthly",
    subscriptionFrequencyQuarterly: "Quarterly",
    subscriptionFrequencyYearly: "Yearly",
    editFrequencyTooltip: "Edit frequency",
    editAmountTooltip: "Edit amount",
    hideUserDialogTitle: "Confirmation",
    hideUserDialogHideMsg: "If you hide this user, they will not appear as active until you unhide them, and they will not be able to access the platform with their username and password. Do you want to continue?",
    hideUserDialogUnhideMsg: "If you enable this user again, they will be able to access the platform with their username and password. Do you want to continue?",
    hideUserDialogCancel: "Cancel",
    hideUserDialogConfirm: "Confirm",
    actionsMarkPayed: "Mark this payment as payed?",
    actionsMarkUnpayed: "Mark this payment as unpaid?",
    actionsRemovePayment: "Remove this payment?",
    actionsMarkPayedTooltip: "Mark as payed",
    actionsMarkUnpayedTooltip: "Mark as unpaid",
    actionsRemovePaymentTooltip: "Remove payment",
    actionsConfirmYes: "Yes",
    actionsConfirmNo: "No",
    manageUsersAddPaymentInvalid: "Provide a valid date and amount.",
    manageUsersAddPaymentFail: "Failed to create payment.",
    manageUsersAddPayment: "+ Add Payment",
    manageUsersAddPaymentAdding: "Adding...",
    manageUsersAddPaymentCreate: "Create",
    manageUsersAddPaymentCancel: "Cancel",
    manageUsersAddPaymentNone: "No payments found.",
    manageUsersQuickFilters: "Quick filters",
    manageUsersQuickFilterAll: "All",
    manageUsersQuickFilterDue: "Payments due",
    manageUsersQuickFilterNoFuture: "No future payments",
    manageUsersQuickFilterAllActive: "All active users",
    manageUsersQuickFilterHidden: "Hidden users",
    sendWelcomeEmail: "Send welcome email",
    sendWelcomeEmailSuccess: "Welcome email sent!",
    sendWelcomeEmailError: "Could not send the welcome email.",
    sendWelcomeEmailConfirm: (name, email) => `A welcome email will be sent to ${name} (${email}) so they can generate a new password. Do you want to continue?`,
    manageUsersTableEmpty: "No users.",
    manageUsersTableShowing: "Showing {from}–{to} of {total} users",
    hideUser: "Hide user",
    unhideUser: "Unhide user",
    hiddenUserStatus: "User hidden",
    adminMenuHome: "Home",
    adminMenuAthletes: "Athletes",
    adminMenuSettings: "Settings",
    adminMenuAbout: "About",
    adminMenuFeedback: "Feedback",
    adminMenuExercises: "Exercises",
    adminMenuTrainingBlocks: "Training Blocks",
    adminMenuCreateBlock: "Create Block",
    adminMenuManageBlocks: "Manage Blocks",
    nutritionMenu: "Nutrition",
    nutrientsMenu: "Nutritional values",
    elaborations: "Elaborations",
    editFieldTooltip: "Click to edit",
    wizardAddExercise: "Add exercise",
    wizardNoExercises: "No exercises assigned.",
    wizardRemoveExercise: "Remove Exercise",
    wizardAddDropsetCheckbox: "Add dropset series",
    wizardSeriesLabel: "Series",
    wizardSeriesCopy: "Duplicate series",
    wizardSeriesAdd: "Insert blank series below",
    wizardSeriesRemove: "Delete series",
    wizardMinReps: "Min reps",
    wizardMaxReps: "Max reps",
    wizardMinRIR: "Min RIR",
    wizardMaxRIR: "Max RIR",
    wizardSeriesNotes: "Notes",
    wizardDropsetNotes: "Notes (dropset)",
    wizardDragSeries: "Drag to reorder",
    wizardDragExercise: "Drag to reorder exercise",
    createBlockWizardStepConfig: "Select athlete and configuration",
    createBlockWizardStepDesign: "Program design",
    createBlockWizardStepSummary: "Summary and confirmation",
    createBlockWizardAthleteLabel: "Athlete",
    createBlockWizardAthletePlaceholder: "Search athlete",
    createBlockWizardWeeksLabel: "Number of weeks",
    createBlockWizardDaysPerWeekLabel: "Days per week",
    createBlockWizardDesignStepText: "Design: Drag and arrange exercises per day…",
    createBlockWizardSummaryStepText: "Review your selections before creating block…",
    createBlockWizardBackButton: "Back",
    createBlockWizardFinishButton: "Finish",
    createBlockWizardNextButton: "Next",
    createBlockWizardStep1Info: "To start creating the block, select the athlete, the block duration in weeks, and how many days per week the athlete will train.",
    blockVisibilityLabel: "Block visibility",
    blockVisibilityImmediately: "Publish the block for the athlete immediately",
    blockVisibilityNotYet: "Do not publish yet, I will do it later",
    trainingTab: "Training",
    trainingTableExercise: "Exercise",
    trainingTableSeries: "Series",
    trainingTableDS: "DS",
    trainingTableWeight: "Weight",
    trainingTableReps: "Reps",
    trainingTableMinMaxReps: "Min-Max Reps",
    trainingTableRIR: "RIR",
    trainingTableMinMaxRIR: "Min-Max RIR",
    trainingTableProgress: "Progress",
    createAthlete: "Create athlete",
    dropsetAbbr: "DS",
    repsMin: "Reps Min",
    repsMax: "Reps Max",
    rirMin: "RIR Min",
    rirMax: "RIR Max",
    notes: "Notes",
    updateDsError: "Failed to update DS field",
    setDsOffTitle: "Set Dropset OFF",
    setDsOnTitle: "Set Dropset ON",
    trainerNoteLabel: "Trainer Note",
    athleteNoteLabel: "Athlete Note",
    athleteDataGroup: "Athlete Data",
    min: "Min",
    max: "Max",
    networkOrClientError: "A network or client error occurred",
    networkOrClientErrorCreateAthlete: "Network or client error while creating athlete",
    usernameTakenError: "That username is already taken",
    emailTakenError: "That email is already taken",
    invalidEmailError: "Invalid email address",
    createUserFrequencyLabel: "Create user frequency",
    searchUserTablePlaceholder: "Search by name, username, or email",
    measurementsTab: "Measurements",
    measurementsTitle: "Measurements",
    measurementsAdd: "Add measurement",
    measurementsSaving: "Saving…",
    measurementsDeletedSuccess: "Measurement deleted",
    measurementsColumnId: "ID",
    measurementsColumnDate: "Date",
    measurementsColumnWeight: "Weight",
    measurementsColumnNeck: "Neck",
    measurementsColumnArm: "Arm",
    measurementsColumnWaist: "Waist",
    measurementsColumnAbdomen: "Abdomen",
    measurementsColumnHip: "Hip",
    measurementsColumnThigh: "Thigh",
    measurementsColumnCalfMuscle: "Calf",
    measurementsLoading: "Loading…",
    measurementsEmpty: "No measurements.",
    measurementsModalTitle: "Add measurement",
    measurementsModalCancel: "Cancel",
    measurementsDeleteConfirm: "Delete this measurement?",
    measurementsDeleted: "Measurement deleted",
    measurementsDeleteError: "Error deleting measurement",
    measurementsDelete: "Delete",
    measurementsSaveError: "Error saving measurement",

    // Muscle group translation keys
    muscleGroupQuadriceps: "Quadriceps",
    muscleGroupHamstring: "Hamstring",
    muscleGroupGlute: "Glute",
    muscleGroupAdductor: "Adductor",
    muscleGroupCalf: "Calf",
    muscleGroupForearm: "Forearm",
    muscleGroupBiceps: "Biceps",
    muscleGroupTriceps: "Triceps",
    muscleGroupLateralDelt: "Lateral Delt",
    muscleGroupPosteriorDelt: "Posterior Delt",
    muscleGroupAnteriorDelt: "Anterior Delt",
    muscleGroupPectoral: "Pectoral",
    muscleGroupClavicularPec: "Clavicular Pec",
    muscleGroupUpperBack: "Upper Back",
    muscleGroupLat: "Lat",
    muscleGroupLowerBack: "Lower Back",
    muscleGroupAbdomen: "Abdomen",
    emptyValue: "—",
    weekProgressLabel: "Progress",
    percentLabel: "%",
    weeklyProgressTitle: "Weekly progress",
    followUpInfoBox: "From this panel you can track the most inactive users. The last activity date indicates the last time the athlete recorded a training activity in their form. In the filter, you can set the minimum inactivity period you want to apply.",
    logout: "Logout",
    deleteDayExerciseTitle: "Eliminar ejercicio del día",
    deleteDayExerciseConfirm: "¿Seguro que quieres eliminar este ejercicio?",
    deleteDayExerciseWarning: "Toda la información introducida para este ejercicio y todas sus series de este día, incluyendo los datos introducidos por el atleta, se eliminará permanentemente.",
    remove: "",
    nutrientGroupComposition: "Composition",
    nutrientGroupVitamins: "Vitamins",
    nutrientGroupMinerals: "Minerals",
    nutrientGroupAminoAcids: "Amino acids",
    nutrientGroupAlkalinity: "Alkalinity / Acidity",

    nutrientCalories: "Energy",
    nutrientProtein: "Protein",
    nutrientFat: "Fat",
    nutrientCarbohydrates: "Carbohydrates",
    nutrientWater: "Water",
    nutrientNitrogen: "Nitrogen",

    nutrientVitaminA_ui: "Vitamin A",
    nutrientVitaminB1_mcg: "Vitamin B1",
    nutrientVitaminB2_mcg: "Vitamin B2",
    nutrientVitaminC_mcg: "Vitamin C",
    nutrientNiacin_mcg: "Niacin",

    nutrientSodium_mg: "Sodium",
    nutrientPotassium_mg: "Potassium",
    nutrientCalcium_mg: "Calcium",
    nutrientMagnesium_mg: "Magnesium",
    nutrientIron_mg: "Iron",
    nutrientCopper_mg: "Copper",
    nutrientPhosphorus_mg: "Phosphorus",
    nutrientSulfur_mg: "Sulfur",
    nutrientChloride_mg: "Chloride",

    nutrientPhenylalanine_mg: "Phenylalanine",
    nutrientIsoleucine_mg: "Isoleucine",
    nutrientLeucine_mg: "Leucine",
    nutrientLysine_mg: "Lysine",
    nutrientMethionine_mg: "Methionine",
    nutrientThreonine_mg: "Threonine",
    nutrientTryptophan_mg: "Tryptophan",
    nutrientValine_mg: "Valine",

    nutrientAcid: "Acidity",
    nutrientAlcal: "Alkalinity",

    // Nutrition wizard steps
    nutritionPlan: "Nutrition Plan",
    back: "Back",
    next: "Next",
    nutritionWizardStep1: "Select athlete & meals/day",
    nutritionWizardStep2: "Nutrient restrictions",
    nutritionWizardStep3: "Template day",
    nutritionWizardStep4: "Weekly plan",
    nutritionWizardStep5: "Confirmation",
    nutritionWizardRestrictionHint: "If the athlete has any nutritional restrictions for daily intake, specify them here to help control the nutritional planning process.",
    nutritionWizardAthleteStepHint: "Select the athlete for whom to create the nutrition plan and the number of daily meals."
  },

  es: {
    activePlanExistsTitle: "Ya existe un plan activo",
    activePlanExistsText: "Este atleta ya tiene un plan nutricional activo. El plan actual será archivado, ¿quieres continuar?",
    confirm: "Confirmar",
    finish: "Finalizar",
    optionsLabel: "Opciones:",
    athlete: "Atleta",
    planTitle: "Título del plan",
    mealsPerDay: "Comidas por día",
    optionName: "Nombre de opción",
    optionDescription: "Descripción de la opción",
    mealLabel: "Comida",
    addMeal: "Añadir comida",
    removeMeal: "Eliminar comida",
    addOption: "Añadir opción",
    removeOption: "Quitar opción",
    foodsCaption: "Alimentos",
    addFood: "Añadir alimento",
    selectOrSearchFood: "Selecciona o busca alimento",
    grams: "Gramos",
    weekdays: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
    loadingBlocks: "Cargando bloques...",
    loadingNutritionPlan: "Cargando plan nutricional...",
    noBlocksForAthlete: "No se encontraron bloques para este atleta.",
    weeklyPlanHint: "Plan semanal elaborado a partir del día plantilla, puedes editar días concretos si es necesario.",
    loadingBlockDetails: "Cargando detalles de bloque...",
    followup: "Seguimiento",
    followupActivity: "Actividad",
    followupBlock: "Último bloque",
    blockCompletionThreshold: "% completado",
    blockNumberLabel: "Bloque #",
    blockCreatedAtLabel: "Creado el",
    blockCompletionPercentLabel: "% completado",
    blockCompletionInfo: "Consulta atletas cuyo último bloque tiene un porcentaje igual o superior al especificado. Para estos atletas deberás crear un nuevo bloque próximamente.",
    followUpTabInactivity: "Inactividad",
    dataGridLocale: dataGridEsES,
    // --- Future Payment Dialog additions:
    futurePaymentDialogMessage: (athleteName: string) => `El pago actual ha sido marcado como pagado. ¿Deseas crear un pago futuro para ${athleteName}?`,
    futurePaymentDialogTitle: "Crear pago futuro",
    futurePaymentDialogAmount: "Nuevo importe de pago",
    futurePaymentDialogDate: "Fecha del próximo pago",
    futurePaymentDialogYes: "Sí",
    futurePaymentDialogNo: "No",
    neverLabel: "Nunca",
    pickersLocale: pickersEsES,
    coreLocale: coreEsES,
    athleteFirstName: "Nombre",
    athleteLastName: "Apellidos",
    email: "Correo",
    lastActivityDate: "Última actividad",
    daysSinceLastActivity: "Días de inactividad",
    periodUnitLabel: "Unidad de tiempo",
    daysLabel: "Día(s)",
    weeksLabel: "Semana(s)",
    monthsLabel: "Mes(es)",
    unitsLabel: "Cantidad",
    searchButton: "Buscar",
    datagridNoRowsLabel: "Sin filas",
    datagridRowsPerPage: "Filas por página:",
    // Añadido para UserTable/Popover:
    notesPopoverTitle: "Notas",
    notesPopoverTooltip: "Ver notas",
    noDaysForWeek: "No hay días disponibles en esta semana.",
    measurementsChartMonthsShort: [
      "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
      "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"
    ],
    athleteNotesModalTitle: (firstName: string, lastName?: string) => `Notas de ${(firstName ?? "") + (lastName ? " " + lastName : "")}`,

    noteButtonTitle: (firstName: string, lastName?: string) => `Notas de ${(firstName ?? "") + (lastName ? " " + lastName : "") || "Atleta"}`,
    measurementsMenu: "Medidas",
    sexLabel: "Sexo",
    sexMale: "Hombre",
    sexFemale: "Mujer",
    sexOther: "Otro",
    manageUsersQuickFilterNoPlan: "Sin planificación",
    noActiveNutritionPlan: "No hay planes nutricionales activos para este atleta.",
    manageUsersQuickFilterNoPassword: "Usuarios sin contraseña",
    noExercisesForDay: "Ningún ejercicio para este día.",
    // Password page translations (new)
    passwordTitle: "Crear contraseña",
    passwordSnackbarInvalidOrExpired: "Enlace inválido o expirado.",
    passwordSnackbarRequirements: "La contraseña no cumple los requisitos.",
    passwordSnackbarMismatch: "Las contraseñas no coinciden.",
    passwordSnackbarError: "Ha ocurrido un error. Inténtalo de nuevo o contacta soporte.",
    passwordInvalidOrExpired: "Enlace inválido o expirado.",
    passwordLoadingUser: "Cargando usuario...",
    passwordLabel: "Contraseña",
    passwordRepeatLabel: "Repite la contraseña",
    passwordHelperText: "Mínimo 6 caracteres, mayúsculas, minúsculas y números",
    passwordHelperTextMismatch: "Las contraseñas no coinciden",
    passwordButton: "Guardar contraseña",

    blockNoContent: "No hay contenido del bloque disponible.",
    blockNoWeeks: "No hay semanas en el bloque.",
    blockNoDaysInWeek: "No hay días en esta semana.",
    blockNoExerciseForDay: "Ningún ejercicio para este día.",
    copyWeekError: "Ha ocurrido un error al copiar la semana",
    deleteBlockTooltip: "Eliminar bloque",
    hideBlock: "Ocultar bloque",
    publishBlock: "Publicar bloque",
    weekLabel: "Semana",
    moveWeekBack: "Mover semana hacia atrás",
    moveWeekForward: "Mover semana hacia adelante",
    copyWeekTooltip: "Copiar semana",
    deleteWeekTooltip: "Eliminar semana",
    series: "Series",
    copyWeekTitle: "Copiar semana",
    copyWeekConfirm: (from, to) => `¿Seguro que quieres copiar la semana ${from}? Esta acción moverá hacia delante todas las semanas siguientes y creará una nueva semana ${to} con los mismos días, ejercicios, series y valores.`,
    cancel: "Cancelar",
    copy: "Copiar",
    deleteWeekTitle: "Eliminar semana",
    deleteWeekConfirm: (week) => `¿Seguro que quieres eliminar la semana ${week}?`,
    delete: "Eliminar",
    hideBlockConfirm: "El atleta dejará de ver este bloque. ¿Seguro?",
    publishBlockConfirm: "El atleta podrá ver este bloque a partir de ahora.",
    deleteBlockTitle: "Eliminar bloque",
    deleteBlockConfirm: (blockLabel) => `¿Seguro que quieres eliminar ${blockLabel}? Se eliminarán todas las semanas y datos asociados.`,
    thisBlock: "este bloque",
    seriesSingular: "serie",
    seriesPlural: "series",
    trainingTab: "Entrenamiento",
    trainingTableExercise: "Ejercicio",
    trainingTableSeries: "Serie",
    trainingTableDS: "DS",
    trainingTableWeight: "Peso",
    trainingTableReps: "Reps",
    trainingTableMinMaxReps: "Rango Reps",
    trainingTableRIR: "RIR",
    trainingTableMinMaxRIR: "Rango RIR",
    trainingTableProgress: "Prog.",
    athletes: "Atletas",
    dashboard: "Entrenamiento",
    loginTitle: "Iniciar sesión",
    loginUsernameLabel: "Usuario",
    activeAthletesTitle: "Atletas activos",
    activeAthletesInterval: "Atletas activos por mes",
    actualRevenueTitle: "Ingresos reales",
    actualRevenueInterval: "Ingresos mensuales (últimos 12 meses)",
    futureRevenueTitle: "Ingresos futuros",
    futureRevenueInterval: "Ingresos esperados (próximos 12 meses)",
    overviewTitle: "Resumen",
    detailsTitle: "Detalles",
    unpaidRevenueTitle: "Ingresos pendientes",
    unpaidRevenueLabel: "Total de ingresos vencidos no cobrados",
    loginUsernamePlaceholder: "Introduce tu usuario",
    loginPasswordLabel: "Contraseña",
    loginPasswordPlaceholder: "Introduce tu contraseña",
    loginLoading: "Iniciando sesión...",
    loginFailed: "Error al iniciar sesión",
    loginUsernameRequired: "Por favor introduce un usuario.",
    signinPasswordTooShort: "La contraseña debe tener al menos 6 caracteres.",
    signinLoginFailed: "Error de autenticación",
    signinLoginSuccess: "Inicio de sesión exitoso. Redirigiendo...",
    unexpectedResponse: "Respuesta inesperada.",
    couldNotConnect: "No se pudo conectar al servidor.",
    signinTitle: "Iniciar sesión",
    signinEmailLabel: "Correo electrónico",
    signinEmailPlaceholder: "tucorreo@correo.com",
    signinPasswordLabel: "Contraseña",
    signinPasswordPlaceholder: "••••••",
    signinRememberMe: "Recuérdame",
    signinButton: "Iniciar sesión",
    signinForgotPassword: "¿Olvidaste tu contraseña?",
    signinDividerOr: "o",
    signinWithGoogle: "Iniciar sesión con Google",
    signinWithFacebook: "Iniciar sesión con Facebook",
    signinNoAccount: "¿No tienes una cuenta?",
    signinSignup: "Regístrate",
    dashboardTitle: "Panel del atleta",
    adminMenu: "Menú de administrador",
    manageUsers: "Gestionar usuarios",
    manageExercises: "Gestionar ejercicios",
    createTrainingBlocks: "Crear bloques de entrenamiento",
    previousWeek: "Semana anterior",
    ds: "DS",
    nextWeek: "Semana siguiente",
    block: "Bloque",
    blockWeekDayLabel: (block, week, day) => `Bloque ${block} / Semana ${week} / Día ${day}`,
    blockWeekLabel: (block, week) => `Bloque ${block} / Semana ${week}`,
    week: "Semana",
    day: "Día",
    exercise: "Ejercicio",
    exercises: "Ejercicios",
    createUserPaymentAmountLabel: "Importe del pago",
    createUserFrequencyMonthly: "Mensual",
    createUserFrequencyQuarterly: "Trimestral",
    createUserFrequencyYearly: "Anual",
    muscleGroup: "Grupo muscular",
    muscleGroupsLabel: "Grupos musculares",
    reps: "Reps",
    weight: "Peso",
    rir: "RIR",
    progress: "Prog.",
    showLegend: "Ver leyenda de progreso",
    progressLegend: "Leyenda de Progreso",
    progressLegendMoreWeightMoreReps: "Más peso y más repes",
    progressLegendSameWeightMoreReps: "Mismo peso, más repes",
    progressLegendMoreWeightSameReps: "Más peso, mismas repes",
    progressLegendLessWeightMoreReps: "Menos peso, más repes",
    progressLegendMoreWeightLessReps: "Más peso, menos repes",
    progressLegendSameWeightLessReps: "Mismo peso, menos repes",
    progressLegendLessWeightLessReps: "Menos peso y menos repes",
    progressLegendNoProgress: "Sin progreso",
    progressLegendMoreRepsOnly: "Más repes",
    progressLegendLessRepsOnly: "Menos repes",
    progressLegendMoreWeightOnly: "Más peso",
    progressLegendLessWeightOnly: "Menos peso",
    legend1: "Repeticiones y peso suben",
    legend2: "Uno sube, otro neutro",
    legend3: "Uno sube, otro baja",
    legend4: "Uno baja, otro neutro",
    legend5: "Ambos bajan",
    legend6: "Ambos neutros",
    legend7: "Métrica mejoró",
    legend8: "Métrica igual",
    legend9: "Métrica empeoró",
    close: "Cerrar",
    of: "de",
    calendarAria: (idx: number) => `Seleccionar fecha del día ${idx + 1}`,
    athleteSeparator: "|",
    language: "Idioma",
    nameDefault: "John Doe",
    progressRLabel: "R",
    progressWLabel: "P",
    lastWeekShort: "→",
    loadingAthletes: "Cargando atletas...",
    creatingBlock: "Creando bloque...",
    blockCreated: "¡Bloque creado!",
    loadingScheduledTraining: "Cargando entrenamiento...",
    manageUsersTableName: "Nombre",
    manageUsersTableEmail: "Correo",
    manageUsersTableStatus: "Estado",
    manageUsersTableActions: "Acciones",
    manageUsersModalHeader: "Detalles del atleta",
    manageUsersModalFirstName: "Nombre",
    manageUsersModalLastName: "Apellido",
    manageUsersModalName: "Nombre",
    manageUsersModalUsername: "Usuario",
    manageUsersModalEmail: "Correo",
    manageUsersModalId: "ID",
    manageUsersModalLastLogin: "Último acceso",
    manageUsersModalRole: "Rol",
    manageUsersStatusEmpty: "",
    manageUsersActionsEmpty: "",
    accessDenied: "Acceso denegado",
    accessDeniedDesc: "Solo administradores pueden gestionar usuarios.",
    manageUsersFilterOnlyUnpaid: "Solo impagados",
    paymentsTableDate: "Fecha",
    paymentsTableAmount: "Importe",
    paymentsTablePaid: "Pagos al corriente",
    paymentsTablePaidHeader: "Pagos",
    paymentsTableUnpaid: "Pagos pendientes",
    paymentsTableActions: "Acciones",
    infoTab: "Información",
    paymentsTab: "Pagos",
    blocksTab: "Bloques",
    nutritionTab: "Plan nutricional",
    addPaymentDialogTitle: "Nuevo pago",
    addPaymentDialogDate: "Fecha",
    addPaymentDialogAmount: "Importe (€)",
    addPaymentDialogCancel: "Cancelar",
    addPaymentDialogAdd: "Añadir",
    addPaymentDialogShowOnlyPending: "Mostrar solo pendientes",
    addPaymentButton: "Añadir pago",
    paymentAdded: "Pago añadido",
    subscriptionAmountLabel: "Cuota (€)",
    subscriptionFrequencyLabel: "Frecuencia",
    subscriptionFrequencyMonthly: "Mensual",
    subscriptionFrequencyQuarterly: "Trimestral",
    subscriptionFrequencyYearly: "Anual",
    editFrequencyTooltip: "Editar frecuencia",
    editAmountTooltip: "Editar cuota",
    hideUserDialogTitle: "Confirmación",
    hideUserDialogHideMsg: "Si ocultas el usuario no aparecerá como activo hasta que lo vuelvas a habilitar y no podrá acceder a la aplicación con su nombre de usuario y contraseña, ¿deseas continuar?",
    hideUserDialogUnhideMsg: "Si habilitas de nuevo a este usuario podrá volver a acceder a la plataforma con su nombre de usuario y contraseña, ¿deseas continuar?",
    hideUserDialogCancel: "Cancelar",
    hideUserDialogConfirm: "Confirmar",
    actionsMarkPayed: "¿Confirmas marcar este pago como pagado?",
    actionsMarkUnpayed: "¿Confirmas marcar este pago como NO pagado?",
    actionsRemovePayment: "¿Confirmas borrar este pago?",
    actionsMarkPayedTooltip: "Marcar como pagado",
    actionsMarkUnpayedTooltip: "Marcar como NO pagado",
    actionsRemovePaymentTooltip: "Eliminar pago",
    actionsConfirmYes: "Sí",
    actionsConfirmNo: "No",
    manageUsersAddPaymentInvalid: "Introduce una fecha y un importe válidos.",
    manageUsersAddPaymentFail: "No se pudo crear el pago.",
    manageUsersAddPayment: "+ Añadir pago",
    manageUsersAddPaymentAdding: "Añadiendo...",
    manageUsersAddPaymentCreate: "Crear",
    manageUsersAddPaymentCancel: "Cancelar",
    manageUsersAddPaymentNone: "No se encontraron pagos.",
    manageUsersQuickFilters: "Filtros rápidos",
    manageUsersQuickFilterAll: "Todos",
    manageUsersQuickFilterDue: "Pagos pendientes",
    manageUsersQuickFilterNoFuture: "Sin pagos futuros",
    manageUsersQuickFilterAllActive: "Usuarios activos",
    manageUsersQuickFilterHidden: "Usuarios ocultos",
    sendWelcomeEmail: "Enviar correo de bienvenida",
    sendWelcomeEmailSuccess: "¡Correo de bienvenida enviado!",
    sendWelcomeEmailError: "No se pudo enviar el correo de bienvenida.",
    sendWelcomeEmailConfirm: (name, email) => `Se enviará a ${name} (${email}) un correo de bienvenida para que genere una nueva contraseña, ¿desea continuar?`,
    manageUsersTableEmpty: "No hay usuarios.",
    manageUsersTableShowing: "Mostrando {from}–{to} de {total} usuarios",
    hideUser: "Ocultar usuario",
    unhideUser: "Mostrar usuario",
    hiddenUserStatus: "Usuario oculto",
    adminMenuHome: "Inicio",
    adminMenuAthletes: "Atletas",
    adminMenuSettings: "Ajustes",
    adminMenuAbout: "Acerca de",
    adminMenuFeedback: "Comentarios",
    adminMenuExercises: "Ejercicios",
    adminMenuTrainingBlocks: "Bloques de entrenamiento",
    adminMenuCreateBlock: "Crear bloque",
    adminMenuManageBlocks: "Gestionar bloques",
    nutritionMenu: "Nutrición",
    nutrientsMenu: "Valores nutricionales",
    elaborations: "Elaboraciones",
    editFieldTooltip: "Haz clic para editar",
    createAthlete: "Crear atleta",
    blockVisibilityLabel: "Visibilidad del bloque",
    blockVisibilityImmediately: "Publicar el bloque para el atleta al crearlo",
    blockVisibilityNotYet: "No publicarlo aún, lo haré yo en otro momento",
    wizardAddExercise: "Añadir ejercicio",
    wizardNoExercises: "No hay ejercicios asignados.",
    wizardRemoveExercise: "Eliminar ejercicio",
    wizardAddDropsetCheckbox: "Añadir serie dropset",
    wizardSeriesLabel: "Series",
    wizardSeriesCopy: "Duplicar serie",
    wizardSeriesAdd: "Insertar serie en blanco debajo",
    wizardSeriesRemove: "Eliminar serie",
    wizardMinReps: "Min repeticiones",
    wizardMaxReps: "Max repeticiones",
    wizardMinRIR: "Min RIR",
    wizardMaxRIR: "Max RIR",
    wizardSeriesNotes: "Notas",
    wizardDropsetNotes: "Notas (dropset)",
    wizardDragSeries: "Arrastrar para reordenar serie",
    wizardDragExercise: "Arrastra para reordenar ejercicio",
    createBlockWizardStepConfig: "Seleccionar atleta y configuración",
    createBlockWizardStepDesign: "Diseño del programa",
    createBlockWizardStepSummary: "Resumen y confirmación",
    createBlockWizardAthleteLabel: "Atleta",
    createBlockWizardAthletePlaceholder: "Buscar atleta",
    createBlockWizardWeeksLabel: "Número de semanas",
    createBlockWizardDaysPerWeekLabel: "Días por semana",
    createBlockWizardDesignStepText: "Diseño: Arrastra y organiza ejercicios por día…",
    createBlockWizardSummaryStepText: "Revisa tu selección antes de crear el bloque…",
    createBlockWizardBackButton: "Atrás",
    createBlockWizardFinishButton: "Finalizar",
    createBlockWizardNextButton: "Siguiente",
    createBlockWizardStep1Info: "Para empezar a crear el bloque, selecciona el atleta, la duración en semanas del bloque y cuántos días a la semana entrenará el atleta",
    dropsetAbbr: "DS",
    repsMin: "Mín. Reps",
    repsMax: "Máx. Reps",
    rirMin: "Mín. RIR",
    rirMax: "Máx. RIR",
    notes: "Notas",
    updateDsError: "Error al actualizar el campo DS",
    setDsOffTitle: "Marcar DS como NO",
    setDsOnTitle: "Marcar DS como SÍ",
    trainerNoteLabel: "Nota entrenador",
    athleteNoteLabel: "Nota atleta",
    athleteDataGroup: "Datos del atleta",
    min: "Mín.",
    max: "Máx.",
    networkOrClientError: "Se produjo un error de red o cliente",
    networkOrClientErrorCreateAthlete: "Error de red o cliente al crear atleta",
    usernameTakenError: "Ese nombre de usuario ya está en uso",
    emailTakenError: "Ese correo electrónico ya está en uso",
    invalidEmailError: "Correo electrónico inválido",
    createUserFrequencyLabel: "Frecuencia para crear usuario",
    searchUserTablePlaceholder: "Buscar por nombre, usuario o email",
    measurementsTab: "Mediciones",
    measurementsTitle: "Medidas",
    measurementsAdd: "Añadir medida",
    measurementsSaving: "Guardando…",
    measurementsDeletedSuccess: "Medición guardada",
    measurementsColumnId: "Clave",
    measurementsColumnDate: "Fecha",
    measurementsColumnWeight: "Peso (kg)",
    measurementsColumnNeck: "Cuello",
    measurementsColumnArm: "Brazo",
    measurementsColumnWaist: "Cintura",
    measurementsColumnAbdomen: "Abdomen",
    measurementsColumnHip: "Cadera",
    measurementsColumnThigh: "Muslo",
    measurementsColumnCalfMuscle: "Gemelo",
    measurementsLoading: "Cargando…",
    measurementsEmpty: "No hay medidas.",
    measurementsModalTitle: "Añadir medida",
    measurementsModalCancel: "Cancelar",
    measurementsDeleteConfirm: "¿Eliminar esta medición?",
    measurementsDeleted: "Medición borrada",
    measurementsDeleteError: "Error al borrar la medición",
    measurementsDelete: "Borrar",
    measurementsSaveError: "Error al guardar la medida",

    // Muscle group translation keys
    muscleGroupQuadriceps: "Cuádriceps",
    muscleGroupHamstring: "Femoral",
    muscleGroupGlute: "Glúteo",
    muscleGroupAdductor: "Adductor",
    muscleGroupCalf: "Gemelo",
    muscleGroupForearm: "Antebrazo",
    muscleGroupBiceps: "Bíceps directo",
    muscleGroupTriceps: "Tríceps directo",
    muscleGroupLateralDelt: "Delt lateral",
    muscleGroupPosteriorDelt: "Delt posterior",
    muscleGroupAnteriorDelt: "Delt anterior",
    muscleGroupPectoral: "Pectoral",
    muscleGroupClavicularPec: "Pec (haz clavicular)",
    muscleGroupUpperBack: "Espalda alta",
    muscleGroupLat: "Dorsal",
    muscleGroupLowerBack: "Espalda baja",
    muscleGroupAbdomen: "Abdomen",
    emptyValue: "—",
    weekProgressLabel: "Progreso",
    percentLabel: "%",
    weeklyProgressTitle: "Progreso semanal",
    followUpInfoBox: "Desde este panel podrás hacer seguimiento de los usuarios más inactivos. La fecha de última actividad indica cuál fue la última vez que el atleta registró una actividad de entrenamiento en su formulario. En el filtro podrás indicar la inactividad mínima que quieras aplicar.",
    logout: "Cerrar sesión",
    deleteDayExerciseTitle: "Eliminar ejercicio del día",
    deleteDayExerciseConfirm: "¿Seguro que quieres eliminar este ejercicio?",
    deleteDayExerciseWarning: "Toda la información introducida para este ejercicio y todas sus series de este día, incluyendo los datos introducidos por el atleta, se eliminará permanentemente.",
    remove: "",

    nutrientGroupComposition: "Composición",
    nutrientGroupVitamins: "Vitaminas",
    nutrientGroupMinerals: "Minerales",
    nutrientGroupAminoAcids: "Aminoácidos",
    nutrientGroupAlkalinity: "Alcalinidad / Acidez",

    nutrientCalories: "Energía",
    nutrientProtein: "Proteína",
    nutrientFat: "Grasa",
    nutrientCarbohydrates: "Hidratos de carbono",
    nutrientWater: "Agua",
    nutrientNitrogen: "Nitrógeno",

    nutrientVitaminA_ui: "Vitamina A",
    nutrientVitaminB1_mcg: "Vitamina B1",
    nutrientVitaminB2_mcg: "Vitamina B2",
    nutrientVitaminC_mcg: "Vitamina C",
    nutrientNiacin_mcg: "Niacina",

    nutrientSodium_mg: "Sodio",
    nutrientPotassium_mg: "Potasio",
    nutrientCalcium_mg: "Calcio",
    nutrientMagnesium_mg: "Magnesio",
    nutrientIron_mg: "Hierro",
    nutrientCopper_mg: "Cobre",
    nutrientPhosphorus_mg: "Fósforo",
    nutrientSulfur_mg: "Azufre",
    nutrientChloride_mg: "Cloruro",

    nutrientPhenylalanine_mg: "Fenilalanina",
    nutrientIsoleucine_mg: "Isoleucina",
    nutrientLeucine_mg: "Leucina",
    nutrientLysine_mg: "Lisina",
    nutrientMethionine_mg: "Metionina",
    nutrientThreonine_mg: "Treonina",
    nutrientTryptophan_mg: "Triptófano",
    nutrientValine_mg: "Valina",

    nutrientAcid: "Acidez",
    nutrientAlcal: "Alcalinidad",

    // Nutrition wizard steps
    nutritionPlan: "Plan nutricional",
    back: "Atrás",
    next: "Siguiente",
    nutritionWizardStep1: "Selecciona atleta y comidas/día",
    nutritionWizardStep2: "Restricciones de nutrientes",
    nutritionWizardStep3: "Día plantilla",
    nutritionWizardStep4: "Plan semanal",
    nutritionWizardStep5: "Confirmación",
    nutritionWizardRestrictionHint: "Si el atleta tiene alguna restricción nutricional diaria, especifícala aquí para controlar el proceso de planificación nutricional.",
    nutritionWizardAthleteStepHint: "Selecciona el atleta para el cual elaborar el plan nutricional y la cantidad de comidas diarias."
  }
}

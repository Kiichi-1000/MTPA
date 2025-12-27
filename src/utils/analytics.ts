declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
  }
}

export function trackEvent(
  eventName: string,
  eventParams?: Record<string, unknown>
): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
}

export function trackDiagnosisComplete(typeCode: string): void {
  trackEvent('diagnosis_complete', {
    result_type: typeCode,
  });
}

export function trackDiagnosisStart(): void {
  trackEvent('diagnosis_start');
}

export function trackFeedbackSubmit(rating: number): void {
  trackEvent('feedback_submit', {
    rating,
  });
}

export function trackResultShare(typeCode: string, platform: string): void {
  trackEvent('result_share', {
    result_type: typeCode,
    platform,
  });
}

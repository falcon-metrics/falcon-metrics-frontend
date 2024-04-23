// import ContextsJson from '../../core/api/ApiClient/JsonData/03_config_contexts.json'

export class ContextLevel {
  id: string;

  constructor(contextLevelId: string) {
    this.id = contextLevelId;
  }

  portfolioLevel(): string {
    return this.id.split('.')[0];
  }

  initiativeLevel(): any {
    const splitLevels: Array<string> = this.id.split('.');
    if (splitLevels.length > 1) {
      return splitLevels[0] + '.' + splitLevels[1];
    }

    return '';
  }

  isPortfolioContextLevel(): boolean {
    return this.id.split('.').length === 1;
  }

  isInitiativeContextLevel(): boolean {
    return this.id.split('.').length === 2;
  }

  isTeamContextLevel(): boolean {
    return this.id.split('.').length === 3;
  }

  isDefined() {
    return !(this.id === undefined || this.id === null || this.id === '');
  }

  isValid() {
    const validPortfolioRegex = '(^[0-9]+$)';
    const validInitiativeRegex = '(^[0-9]+\\.[0-9]+$)';
    const validTeamRegex = '(^[0-9]+\\.[0-9]+.[0-9]+$)';

    const validContextLevelRegex = new RegExp(
      `${validPortfolioRegex}|${validInitiativeRegex}|${validTeamRegex}`,
    );
    return this.isDefined() && this.id.match(validContextLevelRegex) != null;
  }
}

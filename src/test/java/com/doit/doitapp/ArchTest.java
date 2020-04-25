package com.doit.doitapp;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {
        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("com.doit.doitapp");

        noClasses()
            .that()
            .resideInAnyPackage("com.doit.doitapp.service..")
            .or()
            .resideInAnyPackage("com.doit.doitapp.repository..")
            .should()
            .dependOnClassesThat()
            .resideInAnyPackage("..com.doit.doitapp.web..")
            .because("Services and repositories should not depend on web layer")
            .check(importedClasses);
    }
}

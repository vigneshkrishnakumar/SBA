/**
 * 
 */
package com.cts.sba.projectmanager.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cts.sba.projectmanager.bean.ParentTask;
import com.cts.sba.projectmanager.bean.Project;
import com.cts.sba.projectmanager.bean.Task;
import com.cts.sba.projectmanager.service.ProjectManagerService;

/**
 * Controller class for Project Manager Application
 *
 */
@RestController
@CrossOrigin("*")
@RequestMapping({"/project"})
public class ProjectController {

	@Autowired
	private ProjectManagerService projectManagerService;
	
	Logger logger = LoggerFactory.getLogger(ParentTaskController.class);
	@Autowired
	private ReloadableResourceBundleMessageSource messageSource;
	
	@PostMapping("/saveProject")
	public Project saveProject(@RequestBody Project project) {
		Project newProject = null;
		try {
			newProject = projectManagerService.addProject(project);
			logger.info(messageSource.getMessage("task.added", new Object[0], null));
		} catch(Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage(), e);
		} 
		
		return newProject;
	}
	
	@PutMapping("/updateProject/{id}")
	public Project updateProject(@PathVariable String id, @RequestBody Project project) {
		Project dbProject = null;
		try {
			dbProject = projectManagerService.getProject(id);
			logger.info("Existing task retrieved");
			if(dbProject != null) {
				dbProject.setProject(project.getProject());
				dbProject.setPriority(project.getPriority());
				dbProject.setStartDate(project.getStartDate());
				dbProject.setEndDate(project.getEndDate());
				dbProject = projectManagerService.addProject(dbProject);
				logger.info(messageSource.getMessage("task.updated", new Object[0], Locale.US));
			}
		} catch(Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage(), e);
		} 
		
		return dbProject;
	}
	
	@GetMapping("/fetchProjects")
	public List<Project> fetchProjects() {
		List<Project> projectList = null;
		try {
			projectList = projectManagerService.fetchProjects();
			logger.info(messageSource.getMessage("tasks.fetched", new Object[0], Locale.US));
		} catch(Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage(), e);
		} 
		
		return projectList;
	}
	
	@GetMapping("/getProject/{projectId}")
	public Project getParentTask(@PathVariable String projectId) {
		Project project = null;
		List<ParentTask> parentTasks = null;
		ParentTask parentTask = null;
		List<Task> tasks = null;
		try {
			project = projectManagerService.getProject(projectId);
			if(project != null) {
				parentTasks = new ArrayList<ParentTask>();
				tasks = projectManagerService.getProjectTask(String.valueOf(project.getProjectId()));
				for(Task task : tasks) {
					parentTask = projectManagerService.getParentTask(String.valueOf(task.getParentId()));
					task.setParentTask(parentTask);
				}
				
				project.setTasks(tasks);
			}
			logger.info(messageSource.getMessage("task.fetched", new Object[0], Locale.US));
		} catch(Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage(), e);
		} 
		
		return project;
	}
	
}
